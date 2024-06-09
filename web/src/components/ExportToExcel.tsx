import { write, utils } from "xlsx";
import { saveAs } from "file-saver";
import AsyncButton from "./AsyncButton/AsyncButton";
import { FaRegFileExcel } from "react-icons/fa6";
import { format } from "date-fns/fp";

const formatDate = format("dd-MM-yyyy_HH-mm-ss");

const ExportToExcel = ({ data, fileName, disabled = false }) => {
  const handleExport = async () => {
    await new Promise<void>((resolve) => {
      const setData: any[] = [];
      for (let i = 0; i < data.x.length; i++) {
        setData.push({
          DateTime: data.x[i],
          Value: data.y[i],
        });
      }

      const ws = utils.json_to_sheet(setData);

      // สร้าง workbook และเพิ่ม worksheet ลงไป
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, "Sheet1");

      // เขียน workbook เป็นไฟล์ binary
      const wbout = write(wb, { bookType: "xlsx", type: "binary" });

      // ฟังก์ชันเพื่อแปลง string เป็น ArrayBuffer
      const s2ab = (s) => {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i !== s.length; ++i) {
          view[i] = s.charCodeAt(i) & 0xff;
        }
        return buf;
      };

      // สร้าง Blob จาก ArrayBuffer และบันทึกไฟล์
      saveAs(
        new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
        `${fileName + " " + formatDate(new Date())}.xlsx`
      );
      resolve();
    });
  };

  return (
    <AsyncButton
      className="mb-1 bg-green-600 shadow-green-600/50 border-green-600 disabled:opacity-50 disabled:bg-green-600 hover:bg-green-700 hover:border-green-500 disabled:text-base-300"
      title="Search"
      type="button"
      disabled={disabled}
      onClick={handleExport}
    >
      <FaRegFileExcel className="h-4 w-4" /> Excel
    </AsyncButton>
  );
};

export default ExportToExcel;
