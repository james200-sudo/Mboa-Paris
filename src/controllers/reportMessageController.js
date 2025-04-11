const ReportedMessage = require('../models/ReportedMessage');

const PrivateMessage = require('../models/Message');
const GroupMessage = require('../models/GroupMessage');


exports.deleteReportedMessage = async (req, res) => {
  const reportId = req.params.id;

  try {
    const report = await ReportedMessage.findByPk(reportId);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Supprimer le message concerné
    if (report.type === 'private') {
      await PrivateMessage.destroy({ where: { id: report.messageId } });
    } else if (report.type === 'group') {
      await GroupMessage.destroy({ where: { id: report.messageId } });
    }

    // Supprimer le signalement après traitement
    await report.destroy();

    return res.status(200).json({ message: 'Message and report deleted successfully' });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.markReportAsHandled = async (req, res) => {
    const reportId = req.params.id;
  
    try {
      const report = await ReportedMessage.findByPk(reportId);
  
      if (!report) {
        return res.status(404).json({ message: 'Report not found' });
      }
  
      report.status = 'handled';
      await report.save();
  
      return res.status(200).json({ message: 'Report marked as handled', report });
  
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  const ReportedMessage = require('../models/ReportedMessage');




exports.getReportedMessages = async (req, res) => {
  const status = req.query.status;

  const whereClause = {};
  if (status && ['pending', 'handled'].includes(status)) {
    whereClause.status = status;
  }

  try {
    const reports = await ReportedMessage.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: PrivateMessage,
          as: 'privateMessage',
          required: false
        },
        {
          model: GroupMessage,
          as: 'groupMessage',
          required: false
        }
      ]
    });

    res.status(200).json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.getReportsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const reports = await ReportedMessage.findAll({
      where: {},
      include: [
        {
          model: PrivateMessage,
          as: 'privateMessage',
          where: { senderId: userId },
          required: false
        },
        {
          model: GroupMessage,
          as: 'groupMessage',
          where: { senderId: userId },
          required: false
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    // Ne garder que les reports qui ont un message (privé ou groupe) correspondant
    const filteredReports = reports.filter(report =>
      report.privateMessage !== null || report.groupMessage !== null
    );

    res.status(200).json(filteredReports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


exports.deleteReportsByUser = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const reports = await ReportedMessage.findAll({
        include: [
          {
            model: PrivateMessage,
            as: 'privateMessage',
            where: { senderId: userId },
            required: false,
          },
          {
            model: GroupMessage,
            as: 'groupMessage',
            where: { senderId: userId },
            required: false,
          }
        ]
      });
  
      let deletedCount = 0;
  
      for (const report of reports) {
        if (report.privateMessage) {
          await report.privateMessage.destroy();
          await report.destroy();
          deletedCount++;
        } else if (report.groupMessage) {
          await report.groupMessage.destroy();
          await report.destroy();
          deletedCount++;
        }
      }
  
      return res.status(200).json({
        message: `✅ ${deletedCount} reported messages deleted successfully.`,
      });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  };
  


  