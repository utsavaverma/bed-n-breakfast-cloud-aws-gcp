const cors = require("cors")({ origin: true });
exports.feedbacksementicanalyzer = async (req, res) => {
  cors(req, res, async () => {
    const db_user = require("firebase-admin");

    if (!db_user.apps.length) {
      db_user.initializeApp({
        credential: db_user.credential.applicationDefault(),
      });
    } else {
      db_user.app();
    }
    const firestoreDb = db_user.firestore();

    const { userid, feedback_desc } = req.body;
    console.log("feedback: " + feedback_desc);
    console.log("userId" + userid);
    try {
      if (feedback_desc && feedback_desc.length > 0) {
        const lang = require("@google-cloud/language");
        const service_client = new lang.LanguageServiceClient();
        const document = { content: feedback_desc, type: "PLAIN_TEXT" };
        const [answer] = await service_client.analyzeSentiment({ document });
        const score = answer.documentSentiment.score;

        var sentiment_response;

        if (score > 0.3) {
          sentiment_response = "Positive";
        } else if (score < -0.3) {
          sentiment_response = "Negative";
        } else {
          sentiment_response = "Neutral";
        }
        const response = {
          userid: userid,
          feedback: feedback_desc,
          sentiment_value: score,
          sentiment_response: sentiment_response,
        };
        await firestoreDb
          .collection("feedbackcollection")
          .doc(userid)
          .set(response);

        return res.json({
          msg: "Feedback added!",
          success: true,
          feedback: response,
        });
      }
    } catch (err) {
      return res.status(500).json({
        error: error,
      });
    }
  });
};
