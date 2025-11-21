import { Dialog } from "@headlessui/react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiImages } from "react-icons/bi";
import { toast } from "sonner";

import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from "../../redux/slices/api/taskApiSlice";
import { dateFormatter } from "../../utils";
import { app } from "../../utils/firebase";
import Button from "../Button";
import Loading from "../Loading";
import ModalWrapper from "../ModalWrapper";
import SelectList from "../SelectList";
import Textbox from "../Textbox";
import UserList from "./UsersSelect";

const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORITY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

const uploadedFileURLs = [];

const uploadFile = async (file) => {
  const storage = getStorage(app);
  const name = new Date().getTime() + file.name;
  const storageRef = ref(storage, name);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      () => {},
      (error) => reject(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            uploadedFileURLs.push(downloadURL);
            resolve();
          })
          .catch((error) => reject(error));
      }
    );
  });
};

const AddTask = ({ open, setOpen, task }) => {
  const defaultValues = {
    title: "",
    date: dateFormatter(new Date()),
    team: [],
    stage: LISTS[0],
    priority: PRIORITY[2],
    assets: [],
    description: "",
    links: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  // Local states
  const [stage, setStage] = useState(LISTS[0]);
  const [team, setTeam] = useState([]);
  const [priority, setPriority] = useState(PRIORITY[2]);
  const [assets, setAssets] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();

  // 🔥 Reset values every time the modal opens
  useEffect(() => {
    if (!open) return;

    if (task) {
      // Editing mode
      reset({
        title: task.title || "",
        date: dateFormatter(task.date || new Date()),
        description: task.description || "",
        links: Array.isArray(task?.links)
        ? task.links.join(", ")
        : task?.links || "",
      });

      setTeam(task.team || []);
      setStage(task.stage?.toUpperCase() || LISTS[0]);
      setPriority(task.priority?.toUpperCase() || PRIORITY[2]);
      setAssets([]);
    } else {
      // Add mode → full reset
      reset(defaultValues);
      setTeam([]);
      setStage(LISTS[0]);
      setPriority(PRIORITY[2]);
      setAssets([]);
    }
  }, [open, task, reset]);

  const URLS = task?.assets ? [...task.assets] : [];

  const handleOnSubmit = async (data) => {
    for (const file of assets) {
      setUploading(true);
      try {
        await uploadFile(file);
      } catch (error) {
        console.log("Upload error:", error.message);
        return;
      } finally {
        setUploading(false);
      }
    }

    try {
      const newData = {
        ...data,
        assets: [...URLS, ...uploadedFileURLs],
        team,
        stage,
        priority,
      };

      const res = task?._id
        ? await updateTask({ ...newData, _id: task._id }).unwrap()
        : await createTask(newData).unwrap();

      toast.success(res.message);

      setTimeout(() => setOpen(false), 400);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleSelect = (e) => {
    setAssets(e.target.files);
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Dialog.Title
          as="h2"
          className="text-base font-bold leading-6 text-gray-900 mb-4"
        >
          {task ? "UPDATE TASK" : "ADD TASK"}
        </Dialog.Title>

        <div className="mt-2 flex flex-col gap-6">
          <Textbox
            placeholder="Task title"
            type="text"
            name="title"
            label="Task Title"
            className="w-full rounded"
            register={register("title", {
              required: "Title is required!",
            })}
            error={errors.title?.message || ""}
          />

          <UserList setTeam={setTeam} team={team} />

          <div className="flex gap-4">
            <SelectList
              label="Task Stage"
              lists={LISTS}
              selected={stage}
              setSelected={setStage}
            />
            <SelectList
              label="Priority Level"
              lists={PRIORITY}
              selected={priority}
              setSelected={setPriority}
            />
          </div>

          <div className="flex gap-4">
            <div className="w-full">
              <Textbox
                placeholder="Date"
                type="date"
                name="date"
                label="Task Date"
                className="w-full rounded"
                register={register("date", {
                  required: "Date is required!",
                })}
                error={errors.date?.message || ""}
              />
            </div>
          </div>

          <div className="w-full">
            <p>Task Description</p>
            <textarea
              name="description"
              {...register("description")}
              className="w-full bg-transparent px-3 py-2 border border-gray-300 text-gray-900 outline-none"
            ></textarea>
          </div>

          <div className="w-full">
            <p>
              Add Links{" "}
              <span className="text-gray-600">separated by comma (,)</span>
            </p>
            <textarea
              name="links"
              {...register("links")}
              className="w-full bg-transparent px-3 py-2 border border-gray-300 text-gray-900 outline-none"
            ></textarea>
          </div>
        </div>

        {isLoading || isUpdating || uploading ? (
          <div className="py-4">
            <Loading />
          </div>
        ) : (
          <div className="bg-gray-50 mt-6 mb-4 flex flex-row-reverse gap-4">
            <Button
              label="Submit"
              type="submit"
              className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700"
            />

            <Button
              type="button"
              className="bg-white px-5 text-sm font-semibold text-gray-900"
              onClick={() => setOpen(false)}
              label="Cancel"
            />
          </div>
        )}
      </form>
    </ModalWrapper>
  );
};

export default AddTask;
