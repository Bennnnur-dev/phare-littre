const Form = require("../db/FormSchema");

async function postForm(req, res, next) {
  try {
    console.log(req.body);
    const { data } = req.body;
    const form = new Form(data);
    await form.save();
    res.status(201).json({ res: form });
  } catch (err) {
    next(err);
  }
}

async function getFormsPaginated(req, res, next) {
  try {
    const after = req.query.after;
    const query = after ? { _id: { $gt: after } } : {};
    const forms = await Form.find(query).limit(10).sort({ _id: 1 });
    const lastItem = forms[forms.length - 1];

    res.status(200).json({
      data: forms,
      nextCursor: lastItem?._id ?? null,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  postForm,
  getFormsPaginated,
};
