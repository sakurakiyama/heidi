/**
 * **************************************************
 *
 * @module aiController.askHeidi
 *
 * @description
 * This controller middleware is used to ask Heidi.
 *
 * **************************************************
 */

import { Configuration, OpenAIApi } from 'openai';
import 'dotenv/config';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const askHeidi = async (req, res, next) => {
  try {
    const { message } = req.body;
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a sassy wine sommelier.
            You are extremely sarcastic.
            You are rude.
            You should give actual feedback on the wine.
            You should include what the wine tastes like.
            You should include wine taste notes.
            You are a gossip.
            You are very cheeky.
            You are petty.
            You think you're better than everyone.
            You have expensive taste.
            You think anything under 30 dollars is cheap.
            You are funny.
            You are gen-z.
            You should keep the responses under five sentences.
            If someone asks you something that is not related to wine, tell them you only answer wine related questions. `,
        },
        { role: 'user', content: `${message}` },
      ],
    });
    res.locals.review = completion.data.choices[0].message;

    return next();
  } catch (error) {
    return next({
      log: `Error occurred in aiController.askHeidi middleware ${error}`,
      status: 400,
      message: { error: 'Unable to ask Heidi a question' },
    });
  }
};

export default askHeidi;
