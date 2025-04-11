
const { Op } = require('sequelize');
const User = require('../models/User');

exports.updateUserRole = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  if (!['user', 'admin'].includes(role)) {
    return res.status(400).json({ message: "Role must be 'user' or 'admin'" });
  }

  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = role;
    await user.save();

    res.status(200).json({ message: "User role updated", user });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getAllUsers = async (req, res) => {
  const { role, email, page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  const where = {};

  if (role) where.role = role;
  if (email) where.email = { [Op.like]: `%${email}%` };

  try {
    const { rows: users, count } = await User.findAndCountAll({
      where,
      offset: parseInt(offset),
      limit: parseInt(limit),
      attributes: { exclude: ['password', 'resetToken', 'resetTokenExpiration'] },
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({
      total: count,
      currentPage: parseInt(page),
      totalPages: Math.ceil(count / limit),
      users,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.deleteUser = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const user = await User.findByPk(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      await user.destroy();
      res.status(200).json({ message: "User deleted successfully" });
  
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  exports.suspendUser = async (req, res) => {
    const { userId } = req.params;
    const { isActive } = req.body;
  
    try {
      const user = await User.findByPk(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      if (parseInt(userId) === req.user.id)
        return res.status(400).json({ message: "You cannot suspend your own account" });
  
      user.isActive = isActive;
      await user.save();
  
      res.status(200).json({ message: `User ${isActive ? 'activated' : 'suspended'} successfully`, user });
  
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  const { Parser } = require('json2csv');
const ExcelJS = require('exceljs');

exports.exportUsers = async (req, res) => {
  const { role, format = 'csv' } = req.query;
  const where = {};
  if (role) where.role = role;

  try {
    const users = await User.findAll({
      where,
      attributes: ['id', 'name', 'email', 'role', 'isActive', 'createdAt'],
      order: [['createdAt', 'DESC']],
    });

    if (format === 'xlsx') {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Users');

      worksheet.columns = [
        { header: 'ID', key: 'id' },
        { header: 'Name', key: 'name' },
        { header: 'Email', key: 'email' },
        { header: 'Role', key: 'role' },
        { header: 'Active', key: 'isActive' },
        { header: 'Created At', key: 'createdAt' },
      ];

      worksheet.addRows(users.map(u => u.toJSON()));

      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=users.xlsx');
      await workbook.xlsx.write(res);
      res.end();

    } else {
      const parser = new Parser();
      const csv = parser.parse(users.map(u => u.toJSON()));
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=users.csv');
      res.status(200).end(csv);
    }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

  
  