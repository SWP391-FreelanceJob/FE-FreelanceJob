import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="flex">
      <div className="w-2/3 flex flex-col">
        <div className="flex w-full">
          <div className="w-1/5 flex flex-col items-center lg:mr-0 mr-3">
            <div className="avatar">
              <div className="rounded-full">
                <img
                  className="usr-avatar"
                  src="https://i.pravatar.cc/1000"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="w-3/4">
            <div className="mt-5">
              <div className="flex">
                <h1 className="text-xl font-semibold mb-3 mr-2">Amelia</h1>
                <button
                  className="btn btn-sm upd-btn text-white"
                  onClick={() => navigate("/settings/profile")}
                >
                  Cập nhật thông tin
                </button>
              </div>
              <p className="text-sm mb-3">
                <i className="bi bi-bag"></i> Content Manager
              </p>
              <p className="text-sm mb-4">
                <i className="bi bi-geo-alt"></i> Vương quốc Anh
              </p>
              <div className="flex gap-2 mb-2">
                <div className="badge badge-info badge-outline text-white">
                  .NET
                </div>
                <div className="badge badge-info badge-outline text-white">
                  SQL
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-2">
          <h1 className="text-xl text-black mb-2 font-semibold">
            Giới thiệu bản thân
          </h1>
          <div className="ml-1">
            Giới thiệu
            <br />
            Xin chào bạn,
            <br />
            Rất hân hạnh được làm quen :)
            <br />
            Tôi là một chuyên gia về nội dung, với nhiều năm kinh nghiệm làm và
            quản lý content ở nhiều mảng dịch vụ khác nhau như: Web Designer,
            Content Marketing, Marketing Online.
            <br />
            Ngoài việc viết nội dung Tôi còn là một kỹ sư về thiết kế web đến
            nay được 6 năm kinh nghiệm trong nghề, công việc của tôi nhận yêu
            cầu của khách hàng, phân tích dự án sau đó lên kế hoạch dự án, theo
            dõi dự án, chuyển giao công công nghệ cho khách hàng. <br />
            Các dịch vụ tôi cung cấp là: <br />
            - Viết Content Niche amazon affiliate
            <br />
            - Viết Content Niche Lazada, MasOffer,Adpia, Accesstrade
            <br />
            - Viết bài PR, quảng cáo, báo cáo, blog...
            <br />
            - Viết bài chuẩn SEO 100% theo từ khóa, nội dung yêu cầu.
            <br />
            - Dịch thuật/biên dịch Anh-Việt.
            <br />
            - Biên tập, định hướng nội dung.
            <br />
            - Quản lý website, fanpage.
            <br />
            - Thiết kế website với các ngôn ngữ và mã nguồn mở như: blogger,
            wordpress, opencart, drupal, magento, joonla. Sử dụng cơ sở dữ liệu
            bằng My sql, S qlite, Microsoft SQL sever...
            <br />
            <br />
            Kỹ năng biên dịch, đọc văn bản tiếng Anh của tôi rất chuẩn xác cả về
            câu từ lẫn ngữ pháp. <br />
            Nhìn chung, tôi là một người đam mê câu chữ và tận tụy với công việc
            copywriting. <br />
            <br />
            Dự án thiết kế web site luôn mang mong muốn đem tới cho khách hàng
            những sản phẩm hữu ích trong công việc, tiết kiệm về thời gian, khâu
            quản lý nhân sự và hàng hóa, cơ sở dữ liệu. Mang đến cho bạn và
            doanh nghiệp của bạn giao diện thân thiện với trình duyệt và cả trên
            thiết bị di động. <br />
            <br />
            Với bề dày kinh nghiệm cùng thái độ làm việc nghiêm túc, tận tâm,
            tôi có thể giúp bạn hoàn thành dự án đúng tiến độ &amp; đảm bảo chất
            lượng.
            <br />
            Rất hy vọng được cộng tác cùng bạn!
            <br />
            Kind regards
            <br />
            Amelia{" "}
          </div>
        </div>
        <div className="py-2">
          <h1 className="text-xl text-black mb-2 font-semibold">
            Hồ sơ năng lực
          </h1>
          <div className="inline-flex gap-3 flex-nowrap overflow-auto portfo-overflow">
            <div className="card card-compact bg-base-100 shadow-md mb-4 w-1/3 min-w-[30%]">
              <figure>
                <img
                  className="w-full object-cover"
                  src="https://placekitten.com/1200/1000"
                  alt="Shoes"
                />
              </figure>
              <div className="inline-flex pl-1">
                <div className="card-body">
                  <h2 className="text-base">Design web cho nhameo.com</h2>
                </div>
              </div>
            </div>
            <div className="card card-compact bg-base-100 shadow-md mb-4 w-1/3 min-w-[30%]">
              <figure>
                <img
                  className="w-full object-cover"
                  src="https://placekitten.com/1200/1000"
                  alt="Shoes"
                />
              </figure>
              <div className="inline-flex pl-1">
                <div className="card-body">
                  <h2 className="text-base">Thiet ke data cho cong ty A</h2>
                </div>
              </div>
            </div>
            <div className="card card-compact bg-base-100 shadow-md mb-4 w-1/3 min-w-[30%]">
              <figure>
                <img
                  className="w-full object-cover"
                  src="https://placekitten.com/1200/1000"
                  alt="Shoes"
                />
              </figure>
              <div className="inline-flex pl-1">
                <div className="card-body">
                  <h2 className="text-base">Lam he thong cho cong ty C</h2>
                </div>
              </div>
            </div>
            <div className="card card-compact bg-base-100 shadow-md mb-4 w-1/3 min-w-[30%]">
              <figure>
                <img
                  className="w-full object-cover"
                  src="https://placekitten.com/1200/1000"
                  alt="Shoes"
                />
              </figure>
              <div className="inline-flex pl-1">
                <div className="card-body">
                  <h2 className="text-base">Lam gi do cho ai do</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/3 flex flex-col">
        <div className="card card-compact all-shadow px-8 py-5 mb-2">
          <h1 className="text-xl font-bold pb-3">Thông tin liên lạc</h1>
          <p className="mb-2 text-sm">
            <i className="bi bi-envelope font"></i> Amelia@fpt.edu.vn
          </p>
          <p className="text-sm ">
            <i className="bi bi-phone"></i> 04123123121
          </p>
        </div>
        <div className="m-7">
          <h1 className="text-xl text-black mb-2 font-semibold">
            Dự án đã làm
          </h1>
          <p className="text-sm">Chưa làm dự án nào!</p>
        </div>
        <div className="m-7">
          <h1 className="text-xl text-black mb-2 font-semibold">Kinh nghiệm</h1>
          <p className="text-sm">
            <b>Mới đi làm</b> (Dưới 2 năm làm việc)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
