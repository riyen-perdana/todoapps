import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ClipboardPlus, CirclePlus, X } from "lucide-react";
import Modal from "./Modal";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { FieldError, FieldGroup } from "./ui/field";
import Nodata from "./Nodata";

interface Data {
  id: number;
  title: string;
  description: string;
  isActive: boolean;
}

const formSchema = z.object({
  title: z.string().min(1, "Nama Kegiatan Wajib Diisi."),
  description: z.string().min(1, "Deksripsi Kegiatan Wajib Diisi"),
});

const Main = () => {
  const [data, setData] = React.useState<Data[]>([]);
  const [open, setOpen] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
    mode: "onChange",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setData((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        title: values.title,
        description: values.description,
        isActive: false,
      },
    ]);
    setOpen(false);
    form.reset();
  }

  const HandlerClick = (): void => {
    form.reset();
    setOpen(true);
  };

  const handleDelete = (id: number): void => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <React.Fragment>
      <div className="flex items-center justify-center mt-10">
        <Card className="w-full max-w-2xl rounded-none shadow-none p-5">
          <div className="flex flex-col">
            <div className="flex flex-col items-start justify-center">
              <p className="text-[14px] font-semibold">
                Selamat Datang di Aplikasi Todo
              </p>
              <p className="text-[13px] font-medium">
                Untuk Menambah Data Silahkan Tekan Tombol Tambah
              </p>
            </div>
            <div className="flex items-center justify-between mt-5">
              <Button
                className="bg-primary text-white px-2 py-1 rounded-none shadow-none text-[13px] ml-auto"
                onClick={HandlerClick}
              >
                <ClipboardPlus /> Tambah
              </Button>
            </div>
            <div className="flex items-center justify-start mt-5">
              {data.length > 0 ? (
                <div className="flex flex-col items-center w-full">
                  {data.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between gap-4 mb-2 w-full"
                    >
                      {/* KIRI */}
                      <div className="flex flex-col flex-1 grow">
                        <p className="text-[13px] font-semibold">
                          {item.title}
                        </p>
                        <p className="text-[12px] font-medium text-gray-600">
                          {item.description}
                        </p>
                      </div>

                      {/* KANAN */}
                      <div className="flex items-end justify-end gap-2 flex-none">
                        <Button
                          className="bg-amber-500 text-white px-2 py-1 rounded-none shadow-none text-[13px] hover:bg-amber-600 min-w-24"
                          onClick={() => handleDelete(item.id)}
                        >
                          <X /> Hapus
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Nodata />
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Modal */}
      <Modal open={open} setOpen={setOpen}>
        <DialogContent
          className="sm:max-w-100 md:max-w-150 rounded-none"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle className="text-[14px]">Tambah Kegiatan</DialogTitle>
            <DialogDescription className="text-[13px] -mt-3 text-neutral-950">
              Proses Penambahan Data Kegiatan
            </DialogDescription>
            <hr className="border-t border-amber-500" />
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <FieldGroup>
                <Controller
                  control={form.control}
                  name="title"
                  render={({ field, fieldState }) => (
                    <div className="grid gap-3">
                      <Label
                        htmlFor="title"
                        className="text-[13px] font-semibold"
                      >
                        Nama Kegiatan
                      </Label>
                      <Input
                        id="title"
                        className={
                          fieldState.error
                            ? "border border-red-500 rounded-none -mt-2 sm:text-[10px] focus-visible:ring-0 focus-visible:border-red-500"
                            : "rounded-none focus-visible:ring-0 -mt-2 sm:text-[10px]"
                        }
                        placeholder="Inputkan Nama Kegiatan"
                        {...field}
                      />
                      {fieldState.error && (
                        <FieldError className="-mt-2 text-xs font-semibold">
                          {fieldState.error.message}
                        </FieldError>
                      )}
                    </div>
                  )}
                />
                <Controller
                  control={form.control}
                  name="description"
                  render={({ field, fieldState }) => (
                    <div className="grid gap-3">
                      <Label
                        htmlFor="description"
                        className="text-[13px] font-semibold"
                      >
                        Deskripsi Kegiatan
                      </Label>
                      <Textarea
                        id="description"
                        className={
                          fieldState.error
                            ? "border border-red-500 rounded-none -mt-2 sm:text-[10px] focus-visible:ring-0 focus-visible:border-red-500"
                            : "rounded-none focus-visible:ring-0 -mt-2 sm:text-[10px]"
                        }
                        placeholder="Inputkan Deskripsi Kegiatan"
                        {...field}
                      />
                      {fieldState.error && (
                        <FieldError className="-mt-2 text-xs font-semibold">
                          {fieldState.error.message}
                        </FieldError>
                      )}
                    </div>
                  )}
                />
              </FieldGroup>
            </div>
            <DialogFooter className="mt-5">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="text-[13px] rounded-none bg-red-500 text-white hover:bg-red-400 hover:text-white"
                >
                  <X /> Batal
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="text-[13px] rounded-none bg-green-500 text-white hover:bg-green-400"
              >
                <CirclePlus /> Simpan
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Modal>
    </React.Fragment>
  );
};

export default Main;