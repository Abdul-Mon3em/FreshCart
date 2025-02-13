import err from "../../assets/404.png";
export default function Notfound() {
  return (
    <>
      <br />
      <br />
      <div className=" flex items-center justify-center">
        <img src={err} className="lg:w-8/12 md:w-10/12" alt="Error Url" />
      </div>
    </>
  );
}
