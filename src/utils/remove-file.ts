import fs from "fs";

export const removeFiles = (filePath: string | undefined) => {
   if (filePath === undefined) {
    return
  }
  fs.unlink(filePath, (error) => {
    if (error) {
      console.log(error);
    }
  });
};