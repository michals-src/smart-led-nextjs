import classNames from "classnames";
import { ChevronLeftIcon, XMarkIcon } from "@heroicons/react/24/solid";

export default function PopupHeaderAction(props) {
  const { title, separate, save, onBack, onSave, onClose } = props;

  const cn_header = classNames("p-4 md:px-8 pb-6 border-b", {
    "bg-zinc-800": separate,
    "border-[#FFFFFF11]": separate,
    "border-b-transparent": !separate,
  });

  return (
    <div
      className={`popup-header ` + cn_header}
      style={{ borderRadius: "15px 15px 0 0" }}>
      <div className='flex flex-row flex-nowrap items-center select-none'>
        <div className='w-2/12'>
          <div className='px-3'>
            <button
              className='text-zinc-400 table mx-auto'
              onClick={onBack}>
              <div className='flex flex-row flex-nowrap items-center justify-center'>
                <div className='w-3/12'>
                  <ChevronLeftIcon className='w-3 h-3 text-inherit' />
                </div>
                <div className='w-9/12'>
                  <div className='px-1'>
                    <p className='text-xs text-inherit'>Powrót</p>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
        <div className='w-8/12'>
          <div className='px-8 text-center'>
            <p className='text-xs font-bold select-none'>{title}</p>
          </div>
        </div>
        <div className='w-2/12'>
          {!!(save === false) && (
            <button
              className='w-full p-0 m-0'
              onClick={() => onClose()}>
              <div className='w-auto ml-auto table p-1 bg-zinc-700 rounded-full'>
                <XMarkIcon className='w-5 h-5 text-zinc-400' />
              </div>
            </button>
          )}

          {save && (
            <button
              className='text-zinc-400 table mx-auto'
              onClick={() => onSave()}>
              <div className='flex flex-row flex-nowrap items-center justify-center'>
                <div className='w-full'>
                  <div className='px-1'>
                    <p className='text-xs text-inherit'>Zapisz</p>
                  </div>
                </div>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
