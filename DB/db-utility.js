import client from "./db-client.js";

const getAllEntity = async (name) => {
  try {
    return await client
      .db("zenstudentdashboard")
      .collection(name)
      .find({})
      .toArray();
  } catch (error) {
    return error;
  }
};

const getAllEntityEmail = async (name, obj) => {
  return await client
    .db("zenstudentdashboard")
    .collection(name)
    .find({ email: obj })
    .toArray();
};

const getAllEntityType = async (name, obj) => {
  return await client
    .db("zenstudentdashboard")
    .collection(name)
    .find({ type: obj })
    .toArray();
};

const getAllEntityEmail1 = async (name, obj) => {
  return await client
    .db("zenstudentdashboard")
    .collection(name)
    .find({ email: obj.email, type: obj.type })
    .toArray();
};

const getOneEntity = async (name, obj) => {
  return await client
    .db("zenstudentdashboard")
    .collection(name)
    .findOne({ email: obj }, { _id: 0 });
};

const createEntity = async (name, obj) => {
  try {
    return await client
      .db("zenstudentdashboard")
      .collection(name)
      .insertOne(obj);
  } catch (error) {
    return error;
  }
};

const editEntity = async (name, obj) => {
  return await client
    .db("zenstudentdashboard")
    .collection(name)
    .updateOne(
      { email: obj.email, type: obj.type, title: obj.title },
      {
        $set: {
          marks: obj.marks,
          comments: obj.comments,
          evaluated: obj.evaluated,
        },
      }
    );
};

const editEntityTask = async (name, obj) => {
  return await client
    .db("zenstudentdashboard")
    .collection(name)
    .updateOne(
      { email: obj.email, day: obj.day, evaluated: false },
      {
        $set: {
          marks: obj.marks,
          comments: obj.comments,
          evaluated: obj.evaluated,
        },
      }
    );
};

const editEntityLeave = async (name, obj) => {
  return await client
    .db("zenstudentdashboard")
    .collection(name)
    .updateOne(
      { email: obj.email, date: obj.date, reason: obj.reason },
      {
        $set: {
          approval: obj.approval,
        },
      }
    );
};

const editEntityQuery = async (name, obj) => {
  return await client
    .db("zenstudentdashboard")
    .collection(name)
    .updateOne(
      { email: obj.email, quesId: obj.id },
      {
        $set: {
          assignedTo: obj.assignedTo,
        },
      }
    );
};

const editEntityReq = async (name, obj) => {
  return await client
    .db("zenstudentdashboard")
    .collection(name)
    .updateOne(
      { reqId: obj.reqId },
      {
        $push: {
          appliedBy: obj.email,
        },
      }
    );
};

const editEntityPortFolio = async (name, obj) => {
  return await client
    .db("zenstudentdashboard")
    .collection(name)
    .updateOne(
      { email: obj.email },
      {
        $set: {
          comments: obj.comments,
          evaluated: obj.evaluated,
          reviewedby: obj.reviewedby,
        },
      }
    );
};

const deleteEntity = async (name, obj) => {
  return await client
    .db("zenstudentdashboard")
    .collection(name)
    .deleteOne({ day: obj.day, title: obj.title });
};

export {
  getAllEntity,
  createEntity,
  getOneEntity,
  getAllEntityEmail,
  editEntity,
  getAllEntityEmail1,
  getAllEntityType,
  editEntityLeave,
  editEntityQuery,
  editEntityPortFolio,
  editEntityTask,
  deleteEntity,
  editEntityReq,
};
