const Form = require("../db/FormSchema");

async function postForm(req, res, next) {
  //créer dans la base de donnée un exemplaire de formulaire reçu
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

async function deleteForm(req, res, next) {
  //supprimer dans la base de donnée un exemplaire de formulaire reçu
  try {
    const { id } = req.params;
    const form = await Form.findByIdAndDelete(id);
    res.status(201).json({ res: form });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  postForm,
  deleteForm,
};
