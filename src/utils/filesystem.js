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
            contents: "aspodjkapsodkj aspšdojk",
          },
          Deeper_files: {
            type: "directory",
            files: {
              "file1.txt": {
                type: "text",
                contents: "aspodjkapsodkj aspšdojk",
              },
              "file2.txt": {
                type: "text",
                contents: "aspodjkapsodkj aspšdojk",
              },
              "file3.txt": {
                type: "text",
                contents: "aspodjkapsodkj aspšdojk",
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
export const getRouteFiles = (route) => {
  const directories = route.slice(1).split("/");
  const filesystem = JSON.parse(localStorage.getItem("filesystem"));
  if (filesystem) {
    if (route === "") {
      return filesystem.files;
    }

    return findDirectoryFiles(filesystem, directories);
  }
  return {};
};

const findDirectoryFiles = (filesystem, directories) => {
  const files = { ...filesystem.files };
  const [firstDir, ...rest] = directories;

  if (files.hasOwnProperty(firstDir)) {
    if (isDirectory(files[firstDir])) {
      if (directories.length === 1) {
        return { ...files[firstDir].files };
      } else {
        return findDirectoryFiles(files[firstDir], rest);
      }
    }
  }
  return {};
};

const isDirectory = (file) => {
  return file.type === "directory";
};
