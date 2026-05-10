import InfoItem from "@/components/myPage/myPage-info-item";
import { useMyPageData } from "@/hooks/queries/use-myPage-data";
import { getNickname } from "@/store/authStore";
import { getKoreanAge } from "@/utils/date";
import {
  User,
  Mail,
  Calendar,
  MapPin,
  Briefcase,
  Clock,
  CircleUser,
  Lock,
  UserPen,
  Loader,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MyPage() {
  const navigate = useNavigate();
  const nickname = getNickname();

  const {
    data: myPageData,
    error: myPageError,
    isPending: isMyPagePending,
  } = useMyPageData();

  if (isMyPagePending)
    return (
      <div className="flex justify-center items-center py-10">
        <Loader className="animate-spin w-8 h-8 text-orange-500" />
      </div>
    );

  if (myPageError || !myPageData || !nickname)
    return (
      <div className="text-red-500 text-center py-10">잘못된 접근입니다.</div>
    );

  const koreanAge =
    myPageData.birthDate + " " + getKoreanAge(myPageData.birthDate);

  const handleEditClick = () => {
    navigate("/myPage/edit");
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-orange-50 rounded-2xl">
            <User className="w-8 h-8 text-orange-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {nickname}님, 안녕하세요!
            </h1>
            <p className="text-sm text-gray-500">
              개인 정보를 확인하고 관리할 수 있습니다.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-5 h-5 text-orange-500" />
            <h2 className="text-lg font-semibold text-gray-800">계정 정보</h2>
          </div>

          <InfoItem
            icon={<Mail size={18} />}
            label="이메일"
            value={myPageData.email}
          />
          <InfoItem
            icon={<UserPen size={18} />}
            label="닉네임"
            value={nickname}
          />
          <InfoItem
            icon={<Clock size={18} />}
            label="가입일"
            value={new Date(myPageData.createdAt).toLocaleDateString()}
          />
        </section>

        <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <CircleUser className="w-5 h-5 text-orange-500" />
            <h2 className="text-lg font-semibold text-gray-800">상세 프로필</h2>
          </div>

          <InfoItem
            icon={<Calendar size={18} />}
            label="생년월일"
            value={koreanAge}
          />
          <InfoItem
            icon={<User size={18} />}
            label="성별"
            value={myPageData.gender === "M" ? "남성" : "여성"}
          />
          <InfoItem
            icon={<Briefcase size={18} />}
            label="직업"
            value={myPageData.job.name}
          />
          <InfoItem
            icon={<MapPin size={18} />}
            label="거주지역"
            value={myPageData.address.name}
          />
        </section>
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={handleEditClick}
          className="px-6 py-3 rounded-xl font-bold text-white bg-orange-600 hover:bg-orange-700 shadow-md transition-all active:scale-95"
        >
          정보 수정하기
        </button>
      </div>
    </div>
  );
}
