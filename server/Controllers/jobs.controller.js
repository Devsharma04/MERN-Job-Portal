import User from "../Models/user.model.js";
import Job from "../Models/jobs.model.js";

const createJob = async (req, res) => {
  const { company, position, description, Salary, location } = req.body;
  const { id } = req.user;

  const newjob = await Job.create({
    company,
    position,
    description,
    Salary,
    location,
    createdBy: id,
  });

  res.status(200).json({ message: "job created successfully", job: newjob });
};

export { createJob };
