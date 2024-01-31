import { Popover, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import EmojiPicker, { EmojiClickData, EmojiStyle } from 'emoji-picker-react';

const EmojiSelect = ({
  button,
  setEmoji
}: {
  button: ReactNode,
  setEmoji: (props: string) => void
}) => {
  const handleEmojiClick = (emojiData: EmojiClickData, close: () => void) => {
    console.log(emojiData)
    setEmoji(emojiData.emoji);
    close()
  };

  return (
    <div>
      <Popover className="relative">
        {() => (
          <>
            <Popover.Button className="focus:outline-none">
              {button}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute top-0 left-0 z-[1]">
                {({ close }) => (
                  <div className='h-[455px] -translate-y-[455px] flex items-end pb-[5px]'>
                    <EmojiPicker
                      emojiStyle={EmojiStyle.NATIVE}
                      skinTonesDisabled={true}
                      onEmojiClick={(emojiData: EmojiClickData) => handleEmojiClick(emojiData, close)}
                      height={450}
                      previewConfig={{ showPreview: false }}
                      reactionsDefaultOpen={true}
                      reactions={["1f600", "1f602", "1f970", "1f680", "1f44d", "1f44e", "2665-fe0f"]}
                    />
                  </div>
                )}
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}

export default EmojiSelect;