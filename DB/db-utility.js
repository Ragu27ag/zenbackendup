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
  try {
    return await client
      .db("zenstudentdashboard")
      .collection(name)
      .find({ email: obj })
      .toArray();
  } catch (error) {
    return error;
  }
};

const getAllEntityType = async (name, obj) => {
  try {
    return await client
      .db("zenstudentdashboard")
      .collection(name)
      .find({ type: obj })
      .toArray();
  } catch (error) {
    return error;
  }
};

const getAllEntityEmail1 = async (name, obj) => {
  try {
    return await client
      .db("zenstudentdashboard")
      .collection(name)
      .find({ email: obj.email, type: obj.type })
      .toArray();
  } catch (error) {
    return error;
  }
};

const getOneEntity = async (name, obj) => {
  try {
    return await client
      .db("zenstudentdashboard")
      .collection(name)
      .findOne({ email: obj }, { _id: 0 });
  } catch (error) {
    return error;
  }
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
  try {
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
  } catch (error) {
    return error;
  }
};

const editEntityTask = async (name, obj) => {
  try {
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
  } catch (error) {
    return error;
  }
};

const editEntityLeave = async (name, obj) => {
  try {
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
  } catch (error) {
    return error;
  }
};

const editEntityQuery = async (name, obj) => {
  try {
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
  } catch (error) {
    return error;
  }
};

const editEntityReq = async (name, obj) => {
  try {
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
  } catch (error) {
    return error;
  }
};

const editEntityPortFolio = async (name, obj) => {
  try {
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
  } catch (error) {
    return error;
  }
};

const deleteEntity = async (name, obj) => {
  try {
    return await client
      .db("zenstudentdashboard")
      .collection(name)
      .deleteOne({ day: obj.day, title: obj.title });
  } catch (error) {
    return error;
  }
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
