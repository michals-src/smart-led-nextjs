import classNames from "classnames";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function PopupHeader(props) {
  const { Icon, title, caption, separate, onClose } = props;

  const cn_header = classNames("p-4 md:px-8 pb-6 border-b", {
    "bg-zinc-800": separate,
    "border-[#FFFFFF11]": separate,
    "border-b-transparent": !separate,
  });

  return (
    <div
      className={`popup-header ` + cn_header}
      style={{ borderRadius: "15px 15px 0 0" }}>
      <div className='flex flex-row flex-nowrap items-center'>
        <div className='w-1/12 select-none'>
          <Icon className='w-8 h-8 text-zinc-600' />
        </div>
        <div className='w-9/12 select-none'>
          <div className='px-5'>
            {/* {title}
             */}

            <h3 className='text-xl select-none'>{title}</h3>
            <p className='text-sm text-zinc-500 select-none'>{caption}</p>
          </div>
        </div>
        <div className='w-2/12 select-none'>
          <button
            className='w-full p-0 m-0'
            onClick={() => onClose()}>
            <div className='w-auto ml-auto table p-1 bg-zinc-700 rounded-full'>
              <XMarkIcon className='w-5 h-5 text-zinc-400' />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
