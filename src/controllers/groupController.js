const GroupMember = require('../models/GroupMember');
const User = require('../models/User');

exports.getGroupMembers = async (req, res) => {
  const groupId = req.params.id;

  try {
    const members = await GroupMember.findAll({
      where: { groupId },
      include: [{
        model: User,
        attributes: ['id', 'name', 'email', 'photo']
      }]
    });

    res.status(200).json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
