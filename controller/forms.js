const Form = require("../db/FormSchema");
const { NotFoundErr } = require("../errors/customError");
const sanitize = require("mongo-sanitize");

async function postForm(req, res, next) {
  try {
    req.body = sanitize(req.body); //éviter les injections NOSQL
    const { data } = req.body;
    const form = new Form(data);
    await form.save();
    req.form = form;
    next();
  } catch (err) {
    next(err);
  }
}

async function getFormsPaginated(req, res, next) {
  try {
    req.query = sanitize(req.query);
    const { after, important: imp, search } = req.query;
    console.log(after, typeof after);
    const query = after ? { _id: { $gt: after } } : {};
    console.log(query);
    const forms = await Form.find({
      ...query,
      name: { $regex: search, $options: "i" },
      ...(imp === "TRUE" && { important: true }),
    })
      .limit(10)
      .sort({ _id: 1 });
    const lastItem = forms[forms.length - 1];
    console.log(forms.length);

    res.status(200).json({
      data: forms,
      nextCursor: lastItem?._id ?? "",
    });
  } catch (err) {
    next(err);
  }
}

async function getSingleForm(req, res, next) {
  try {
    req.params = sanitize(req.params);
    const { id } = req.params;
    const form = await Form.findById(id);
    if (!form) {
      throw new NotFoundErr("Impossible de trouver le formulaire demandé");
    }

    res.status(200).json({
      data: form,
    });
  } catch (err) {
    next(err);
  }
}

async function patchForm(req, res, next) {
  try {
    req.body = sanitize(req.body); //éviter les injections NOSQL
    req.params = sanitize(req.params);
    const { id } = req.params;
    const form = await Form.findOneAndUpdate({ _id: id }, req.body.data, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      data: form,
    });
  } catch (err) {
    next(err);
  }
}

async function deleteForm(req, res, next) {
  try {
    req.params = sanitize(req.params);
    const { id } = req.params;
    const form = await Form.findByIdAndDelete(id);
    res.status(200).json({
      data: form,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  postForm,
  getFormsPaginated,
  getSingleForm,
  deleteForm,
  patchForm,
};
