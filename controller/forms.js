const Form = require("../db/FormSchema");
const { NotFoundErr } = require("../errors/customError");

async function postForm(req, res, next) {
  try {
    console.log(req.body);
    const { data } = req.body;
    const form = new Form(data);
    await form.save();
    res.status(201).json({ data: form });
  } catch (err) {
    next(err);
  }
}

async function getFormsPaginated(req, res, next) {
  try {
    const { after, important: imp, search } = req.query;
    const query = after ? { _id: { $gt: after } } : {};
    console.log(imp);
    const forms = await Form.find({
      ...query,
      name: { $regex: search, $options: "i" },
      ...(imp === "TRUE" && { important: true }),
    })
      .limit(10)
      .sort({ _id: 1 });
    const lastItem = forms[forms.length - 1];

    res.status(200).json({
      data: forms,
      nextCursor: lastItem?._id ?? null,
    });
  } catch (err) {
    next(err);
  }
}

async function getSingleForm(req, res, next) {
  try {
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
