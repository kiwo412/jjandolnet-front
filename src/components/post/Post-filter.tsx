import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import type { PostFilterProps } from "@/types/post";

export default function PostFilter({
  condition,
  onConditionChange,
  onSearch,
}: PostFilterProps) {
  const currentFilter = condition?.filter || "title";
  const currentKeyword = condition?.keyword || "";

  return (
    <Card className="border-2 border-gray-100 rounded-[20px] shadow-sm bg-white overflow-hidden mb-8">
      <CardContent className="p-2 px-5">
        <div className="flex flex-row items-center h-11">
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-1.5 h-4 bg-orange-500 rounded-full" />
            <span className="text-[15px] font-extrabold text-gray-800">
              검색
            </span>
          </div>

          <div className="flex items-center gap-2 flex-1 ml-8">
            <div className="w-[110px]">
              <Select
                value={currentFilter}
                onValueChange={(value: any) =>
                  onConditionChange({
                    ...condition!,
                    filter: value,
                    keyword: currentKeyword,
                  })
                }
              >
                <SelectTrigger className="w-full rounded-[12px] border-gray-200 bg-gray-50/50 text-[13px] font-bold h-9 px-3 focus:ring-orange-500">
                  <SelectValue placeholder="제목" />
                </SelectTrigger>
                <SelectContent className="rounded-[14px] border-gray-100 shadow-xl">
                  <SelectItem value="title" className="text-[13px] font-medium">
                    제목
                  </SelectItem>
                  <SelectItem
                    value="content"
                    className="text-[13px] font-medium"
                  >
                    내용
                  </SelectItem>
                  <SelectItem
                    value="nickname"
                    className="text-[13px] font-medium"
                  >
                    글쓴이
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full max-w-[400px]">
              <Input
                value={currentKeyword}
                onChange={(e) =>
                  onConditionChange({
                    ...condition!,
                    filter: currentFilter,
                    keyword: e.target.value,
                  })
                }
                onKeyDown={(e) => e.key === "Enter" && onSearch()}
                placeholder="검색어를 입력하세요"
                className="h-9 rounded-[12px] border-gray-200 bg-gray-50/50 text-[13px] focus-visible:ring-orange-500 placeholder:text-gray-400 font-medium"
              />
            </div>
          </div>

          <div className="flex-shrink-0 ml-2">
            <Button
              onClick={onSearch}
              className="h-9 px-4 rounded-[12px] bg-orange-500 hover:bg-orange-600 text-white font-bold text-[13px] transition-all active:scale-95 flex gap-1.5"
            >
              <Search size={14} />
              조회
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
