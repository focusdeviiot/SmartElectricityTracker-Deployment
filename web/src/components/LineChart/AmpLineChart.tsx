import LineChart, { LimitProps, DatasetsProps } from "./LineChart";
import AsyncButton from "../AsyncButton/AsyncButton";
import { FaSearchengin } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { differenceInMonths, endOfDay, startOfDay } from "date-fns/fp";
import React, { useState } from "react";
import { ReportDeviceRequest } from "../../models/device";
import { getReportDeviceAmpere } from "../../api/api";
import { useAlert } from "../../contexts/AlertContext";
import DatePicker from "react-datepicker";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Controller, useForm } from "react-hook-form";
import ExportToExcel from "../ExportToExcel";

export interface AmpLineChartProps {
  DeviceName?: string;
  DeviceUuid: string;
}

const AmpLineChart: React.FC<AmpLineChartProps> = ({
  // DeviceName,
  DeviceUuid,
}) => {
  const { showAlert } = useAlert();
  const schema = z
    .object({
      dateRange: z
        .object({
          startDate: z.date().nullable(),
          endDate: z.date().nullable(),
        })
        .refine((data) => data.startDate && data.endDate, {
          message: "Please select a date range",
        })
        .refine(
          (data) => {
            if (!data.startDate || !data.endDate) return true;
            const startDate = new Date(data.startDate);
            const endDate = new Date(data.endDate);
            return startDate <= endDate;
          },
          {
            message: "Start date must be less than end date",
          }
        )
        .refine(
          (data) => {
            if (!data.startDate || !data.endDate) return true;
            const endDate = new Date(data.endDate);
            return endDate <= endOfDay(new Date());
          },
          {
            message: "End date must be greater than or equal to today",
          }
        )
        .refine(
          (data) => {
            if (!data.startDate || !data.endDate) return true;
            const startDate = new Date(data.startDate);
            const endDate = new Date(data.endDate);
            const diffInMonths = differenceInMonths(startDate, endDate);
            return diffInMonths <= 3;
          },
          {
            message: "The date range should not exceed 3 months",
          }
        ),
    })
    .required();

  type FormFields = z.infer<typeof schema>;
  const formOptions = { resolver: zodResolver(schema) };
  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FormFields>(formOptions);

  const defaultLimit: LimitProps = {
    suggestedMax: 3,
    suggestedMin: 0,
  };
  const [ampUsage, setAmpUsage] = useState<DatasetsProps>({ x: [], y: [] });
  const [loading, setLoading] = useState<boolean>(false);

  const defaultDateRange = {
    startDate: new Date(),
    endDate: new Date(),
  };

  const onSearch = async () => {
    setLoading(true);
    const { startDate, endDate } = getValues().dateRange;
    if (!startDate || !endDate) return;
    const setStartDate: Date = startOfDay(new Date(startDate));
    const setEndDate: Date = endOfDay(new Date(endDate));
    const data = {
      startDate: setStartDate.toISOString(),
      endDate: setEndDate.toISOString(),
    };

    const reqData: ReportDeviceRequest = {
      device_id: DeviceUuid,
      date_from: data.startDate,
      date_to: data.endDate,
    };

    console.log(reqData);

    try {
      const response = await getReportDeviceAmpere(reqData);
      if (response.success) {
        setAmpUsage({ x: response.data.created_at, y: response.data.ampere });
      }
    } catch (error: any) {
      showAlert(error.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const onReset = async () => {
    reset({
      dateRange: defaultDateRange,
    });

    setAmpUsage({ x: [], y: [] });
  };

  return (
    <>
      <h4 className="text-xl mt-12 font-bold text-center">{DeviceUuid}</h4>
      <form onSubmit={handleSubmit(onSearch)} onReset={onReset}>
        <div className="flex flex-wrap justify-center items-end m-4 gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-4">
              <div className="relative gap-2 w-60">
                <label className="flex mb-1">Report date range from</label>
                <Controller
                  control={control}
                  name="dateRange"
                  defaultValue={defaultDateRange}
                  render={({ field }) => (
                    <DatePicker
                      className={`${
                        errors?.dateRange
                          ? "border-[1px] !border-red-500 focus:right-2"
                          : ""
                      }`}
                      selected={
                        field.value.startDate
                          ? new Date(field.value.startDate)
                          : null
                      }
                      onChange={(e) =>
                        field.onChange({ ...field.value, startDate: e })
                      }
                      selectsStart
                      dateFormat="dd/MM/yyyy"
                      startDate={
                        field.value.startDate
                          ? new Date(field.value.startDate)
                          : null
                      }
                      endDate={
                        field.value.endDate
                          ? new Date(field.value.endDate)
                          : null
                      }
                      nextMonthButtonLabel={
                        <FaChevronRight className="text-gray-500" />
                      }
                      previousMonthButtonLabel={
                        <FaChevronLeft className="text-gray-500" />
                      }
                      popperClassName="react-datepicker-left"
                    />
                  )}
                />
                {errors?.dateRange?.startDate && (
                  <span className="absolute -bottom-5 text-red-500 text-sm">
                    {errors?.dateRange?.startDate?.message}
                  </span>
                )}
              </div>
              <div className="relative gap-2 w-60">
                <label className="flex mb-1">To</label>
                <Controller
                  control={control}
                  name="dateRange"
                  defaultValue={defaultDateRange}
                  render={({ field }) => (
                    <DatePicker
                      className={`${
                        errors?.dateRange ? "border-[1px] !border-red-500" : ""
                      }`}
                      selected={
                        field.value.endDate
                          ? new Date(field.value.endDate)
                          : null
                      }
                      onChange={(e) =>
                        field.onChange({ ...field.value, endDate: e })
                      }
                      selectsEnd
                      startDate={
                        field.value.startDate
                          ? new Date(field.value.startDate)
                          : null
                      }
                      endDate={
                        field.value.endDate
                          ? new Date(field.value.endDate)
                          : null
                      }
                      dateFormat="dd/MM/yyyy"
                      nextMonthButtonLabel={
                        <FaChevronRight className="text-gray-500" />
                      }
                      previousMonthButtonLabel={
                        <FaChevronLeft className="text-gray-500" />
                      }
                      popperClassName="react-datepicker-right"
                    />
                  )}
                />
                {errors?.dateRange?.endDate && (
                  <span className="absolute -bottom-5 text-red-500 text-sm">
                    {errors?.dateRange?.endDate?.message}
                  </span>
                )}
              </div>
            </div>
            {errors?.dateRange && (
              <span className="absolute mt-20 text-red-500 text-sm">
                {errors?.dateRange?.message}
              </span>
            )}
          </div>
          <div className="flex gap-3">
            <AsyncButton
              className="mb-1 bg-gray-400 border-none shadow-none hover:bg-gray-500"
              title="Clear"
              type="reset"
              // loading={loading}
            >
              <FaTrashCan className="h-4 w-4" /> Clear
            </AsyncButton>
            <AsyncButton
              className="mb-1"
              title="Search"
              type="submit"
              loading={loading}
            >
              <FaSearchengin className="h-4 w-4" /> Search
            </AsyncButton>
            <ExportToExcel
              disabled={ampUsage && ampUsage.x.length === 0}
              data={ampUsage}
              fileName={"Amp"}
            />
          </div>
        </div>
      </form>

      <div className="flex justify-center mt-8">
        <div className="w-full xl:w-[980px] h-96">
          <LineChart
            title="Amp"
            unit="A"
            limit={defaultLimit}
            datasets={ampUsage}
          />
        </div>
      </div>
    </>
  );
};

export default AmpLineChart;
