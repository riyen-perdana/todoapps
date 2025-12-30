import React from "react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";
import { ClipboardPlus } from "lucide-react";

const Nodata = () => {
  return (
    <React.Fragment>
      <Empty className="border border-dashed">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ClipboardPlus />
          </EmptyMedia>
          <EmptyTitle>Data Tidak Ditemukan</EmptyTitle>
          <EmptyDescription className="text-[12px] font-semibold">
            Silahkan Klik Tombol Tambah Untuk Melakukan Proses Penambahan Data
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </React.Fragment>
  );
};

export default Nodata;
