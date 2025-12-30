import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ClipboardPlus, CirclePlus, X, Divide } from "lucide-react";
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

interface Data {
  id: number;
  title: string;
  description: string;
  isActive: boolean;
}
[];

const formSchema = z.object({
  title: z.string().min(1, "Nama Kegiatan Wajib Diisi."),
  description: z.string().min(1, "Deksripsi Kegiatan Wajib Diisi"),
});

const Main = () => {
  const [data, setData] = React.useState<Data[]>([]);
  const [open, setOpen] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    resetOptions: {
      keepDirtyValues: false,
      keepErrors: false,
    },
    defaultValues: {
      title: "",
      description: "",
    },
    mode: "onChange",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const HandlerClick = () => {
    form.reset();
    setOpen(true);
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
            <div className="flex items-center justify-end mt-5">
              <Button
                className="bg-primary text-white px-2 py-1 rounded-none shadow-none text-[13px]"
                onClick={HandlerClick}
              >
                <ClipboardPlus /> Tambah
              </Button>
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
                        Nama Kegiatan
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
