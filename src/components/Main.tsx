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

interface Data {
  id: number;
  title: string;
  description: string;
  isActive: boolean;
}
[];

const Main = () => {
  const [data, setData] = React.useState<Data[]>([]);
  const [open, setOpen] = React.useState(false);

  const HandlerClick = () => {
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
          className="sm:max-w-100 md:max-w-150"
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
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title" className="text-[13px] font-semibold">
                Nama Kegiatan
              </Label>
              <Input
                id="title"
                name="title"
                className="rounded-none focus-visible:ring-0 -mt-2 text-sm"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="deskripsi" className="text-[13px] font-semibold">
                Deskripsi Kegiatan
              </Label>
              <Textarea
                id="deskripsi"
                name="deskripsi"
                className="rounded-none focus-visible:ring-0 -mt-2 text-sm"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                className="text-[13px] font-semibold rounded-none bg-red-500 text-white hover:bg-red-400 hover:text-white"
              >
                <X /> Batal
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="text-[13px] font-semibold rounded-none"
            >
              <CirclePlus /> Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Modal>
    </React.Fragment>
  );
};

export default Main;
