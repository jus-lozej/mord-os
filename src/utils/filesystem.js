export const createMockFilesystem = () => {
  const baseFilesystem = {
    type: "root",
    name: "/",
    files: {
      files: {
        type: "directory",
        files: {
          "file1.txt": {
            type: "text",
            text: "File with som text in it.",
          },
          "Nested folder": {
            type: "directory",
            files: {
              "file1.txt": {
                type: "text",
                text: "I am text file 1",
              },
              "file2.txt": {
                type: "text",
                text: "I am text file 2",
              },
              "file3.txt": {
                type: "text",
                text: "I am text file 3",
              },
            },
          },
        },
      },
    },
  };

  const filesystem = JSON.parse(localStorage.getItem("filesystem"));

  if (!filesystem) {
    localStorage.setItem("filesystem", JSON.stringify(baseFilesystem));
  }
};

// Get files of given route
export const getFile = (route) => {
  const directories = route.slice(1).split("/");
  const filesystem = JSON.parse(localStorage.getItem("filesystem"));
  if (filesystem) {
    if (route === "") {
      return filesystem;
    }

    return findFile(filesystem, directories);
  }
  return { type: "directory", files: {} };
};

const findFile = (filesystem, directories) => {
  const files = { ...filesystem.files };
  const [firstDir, ...rest] = directories;

  if (files.hasOwnProperty(firstDir)) {
    if (isDirectory(files[firstDir])) {
      if (directories.length === 1) {
        return { ...files[firstDir] };
      } else {
        return findFile(files[firstDir], rest);
      }
    }
    return { ...files[firstDir] };
  }
  return { type: "directory", files: {} };
};

export const saveFile = (route, file) => {
  const directories = route.slice(1).split("/");
  const filesystem = JSON.parse(localStorage.getItem("filesystem"));

  const newFilesystem = updateFile(filesystem, directories, file);
  localStorage.setItem("filesystem", JSON.stringify(newFilesystem));
};

const updateFile = (filesystem, directories, file) => {
  const files = { ...filesystem.files };
  const [firstDir, ...rest] = directories;

  let newFilesystem = { ...filesystem };
  if (directories.length === 1) {
    newFilesystem = {
      ...newFilesystem,
      files: { ...filesystem.files, [firstDir]: { ...file } },
    };
  } else {
    if (isDirectory(files[firstDir])) {
      newFilesystem = {
        ...newFilesystem,
        files: {
          ...filesystem.files,
          [firstDir]: updateFile(files[firstDir], rest, file),
        },
      };
    }
  }

  return newFilesystem;
};

export const deleteFile = (route) => {
  const directories = route.slice(1).split("/");
  const filesystem = JSON.parse(localStorage.getItem("filesystem"));

  const newFilesystem = removeFile(filesystem, directories);
  localStorage.setItem("filesystem", JSON.stringify(newFilesystem));
};

const removeFile = (filesystem, directories) => {
  const files = { ...filesystem.files };
  const [firstDir, ...rest] = directories;

  let newFilesystem = { ...filesystem };
  if (directories.length === 1) {
    if (files.hasOwnProperty(firstDir)) {
      const newFiles = { ...filesystem.files };
      delete newFiles[firstDir];
      newFilesystem = { ...newFilesystem, files: newFiles };
    }
  } else {
    if (files.hasOwnProperty(firstDir)) {
      if (isDirectory(files[firstDir])) {
        newFilesystem = {
          ...newFilesystem,
          files: {
            ...filesystem.files,
            [firstDir]: removeFile(files[firstDir], rest),
          },
        };
      }
    }
  }

  return newFilesystem;
};

export const isDirectory = (file) => {
  return file.type === "directory";
};

export const isTextFile = (file) => {
  return file.type === "text";
};
