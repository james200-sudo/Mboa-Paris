const { deleteReportedMessage } = require('../controllers/reportMessageController');
const isAdmin = require('../middlewares/isAdmin');
const { markReportAsHandled } = require('../controllers/reportMessageController');

const { getReportsByUser } = require('../controllers/reportMessageController');

router.delete('/messages/:id', auth, isAdmin, deleteReportedMessage);

router.patch('/messages/:id/mark-handled', auth, isAdmin, markReportAsHandled);

router.get('/messages', auth, isAdmin, getReportedMessages);

router.get('/messages/user/:userId', auth, isAdmin, getReportsByUser);
