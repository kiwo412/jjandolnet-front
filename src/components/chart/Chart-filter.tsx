import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "../ui/card";
import type { ChartFilterProps } from "@/types/expense";

export default function ChartFilter({
  filter,
  onFilterChange,
  selectedCategory,
  onCategoryChange,
  categoryList,
}: ChartFilterProps) {
  return (
    <Card className="border-2 border-gray-100 rounded-[20px] shadow-sm bg-white overflow-hidden">
      <CardContent className="p-3 px-5">
        <div className="flex flex-row items-center justify-between h-11">
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-1.5 h-4 bg-orange-500 rounded-full" />
            <span className="text-[15px] font-extrabold text-gray-800">
              필터
            </span>
          </div>

          <div className="flex items-center gap-6">
            <RadioGroup
              value={filter}
              onValueChange={(value) => onFilterChange(value as any)}
              className="grid grid-cols-3 gap-1 bg-gray-100/80 p-1 rounded-[12px] w-[400px] leading-none"
            >
              {[
                { id: "age", label: "나이", value: "age" },
                { id: "job", label: "직업", value: "job" },
                { id: "addr", label: "지역", value: "addr" },
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-center">
                  <RadioGroupItem
                    value={item.value}
                    id={item.id}
                    className="sr-only"
                  />
                  <Label
                    htmlFor={item.id}
                    className={`w-full flex items-center justify-center h-8 rounded-[9px] text-[13px] font-bold cursor-pointer transition-all ${
                      filter === item.value
                        ? "bg-white text-orange-600 shadow-sm border border-gray-200/50"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {item.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="w-[160px]">
              <Select value={selectedCategory} onValueChange={onCategoryChange}>
                <SelectTrigger className="w-full rounded-[12px] border-gray-200 bg-white text-[13px] font-bold focus:ring-orange-500 h-9 px-3">
                  <SelectValue placeholder="소비 항목" />
                </SelectTrigger>
                <SelectContent className="rounded-[14px] border-gray-100 shadow-xl">
                  <SelectItem value="all" className="text-[13px] font-medium">
                    전체 소비 항목
                  </SelectItem>
                  {categoryList?.map((item) => (
                    <SelectItem
                      key={item.id}
                      value={String(item.id)}
                      className="text-[13px] font-medium"
                    >
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
