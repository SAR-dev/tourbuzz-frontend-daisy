import { Popover, Transition } from "@headlessui/react";
import { Fragment, ReactNode, useEffect, useState } from "react";
import { EmojiType, emojis } from "@src/assets/emojis";
import Fuse from "fuse.js";
import { emojiToHex, findMostUsedStrings, hexToEmoji, slugToText } from "@src/functions/helpers";
import useLocalStorageState from "use-local-storage-state";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useEmojiStore } from "@src/stores/emojiStore";

const fuseOptions = {
  keys: ["emoji", "keywords", "key"],
  shouldSort: true,
  ignoreLocation: true,
};

const fuseIndex = Fuse.createIndex(fuseOptions.keys, emojis);

const fuse = new Fuse(emojis, fuseOptions, fuseIndex);

const EmojiSelect = ({
  button,
  setEmoji,
}: {
  button: ReactNode;
  setEmoji: (props: string) => void;
}) => {
  const { expanded, setExpanded, defaultEmojis } = useEmojiStore()
  const [hovered, setHovered] = useState<EmojiType>(emojis[0])
  const [emojisList, setEmojiList] = useState<EmojiType[]>([...emojis])
  const [search, setSearch] = useState("")
  const [history, setHistory] = useLocalStorageState<string[]>("emoji_history", {
    defaultValue: []
  })

  useEffect(() => {
    if (search.length >= 2) {
      setEmojiList(fuse.search(search).map(e => e.item))
    } else {
      setEmojiList([...emojis])
    }
  }, [search])

  const handleEmojiClick = async (emojiHex: string | null, close: () => void) => {
    if(emojiHex == null) return;
    setHistory([...history, emojiHex])
    setEmoji(emojiHex)
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
                  <div className="-translate-y-[31rem] h-[30rem] flex items-end">
                    {expanded ? (
                      <div className="w-96 p-2 card flex-col gap-2 shadow border border-base-300 bg-base-100">
                        <div className="flex gap-3">
                          <input type="text" placeholder="Type at least 3 characters here" className="input input-sm input-bordered w-full" value={search} onChange={e => setSearch(e.target.value)} />
                          <button className="btn btn-sm btn-square" onClick={() => setExpanded(false)}>
                            <MinusIcon className="h-5 w-5" />
                          </button>
                        </div>
                        <div className="custom-scrollbar overflow-y-auto h-96">
                          {history.length > 0 && search.length < 2 && (
                            <div className='mb-2'>
                              <div className="font-semibold mb-2">Previously Selected</div>
                              <div className="grid grid-cols-7 gap-2">
                                {findMostUsedStrings(history, 7).map((e, i) => (
                                  <button
                                    className="border border-base-300 hover:bg-base-200 w-10 h-10 card items-center justify-center flex cursor-pointer hover:bg-base-100"
                                    onClick={() => handleEmojiClick(e, close)}
                                    key={i}
                                  >
                                    <p className="text-2xl">{hexToEmoji(e)}</p>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                          <div className="font-semibold mb-2">Available Emojis</div>
                          <div className="grid grid-cols-7 gap-2">
                            {emojisList.map((e, i) => (
                              <button
                                className="border border-base-300 hover:bg-base-200 w-10 h-10 card items-center justify-center flex cursor-pointer hover:bg-base-100"
                                onClick={() => handleEmojiClick(emojiToHex(e.emoji), close)}
                                onMouseEnter={() => setHovered(e)}
                                key={i}
                              >
                                <p className="text-2xl">{e.emoji}</p>
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className='bg-base-200 p-1 card flex flex-row gap-2 items-center'>
                          <div className="text-4xl h-11">{hovered.emoji}</div>
                          <div className='font-semibold line-clamp-1'>{slugToText(hovered.key)}</div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-96 p-2 card flex-col gap-2 shadow border border-base-300 bg-base-100">
                        <div className="grid grid-cols-7 gap-2">
                          {defaultEmojis.map((e, i) => (
                            <div className="tooltip tooltip-info" data-tip={slugToText(e.key)} key={i}>
                              <button
                                className="border border-base-300 hover:bg-base-200 w-10 h-10 card items-center justify-center flex cursor-pointer hover:bg-base-100"
                                onClick={() => handleEmojiClick(emojiToHex(e.emoji), close)}
                                onMouseEnter={() => setHovered(e)}
                              >
                                <p className="text-2xl">{e.emoji}</p>
                              </button>
                            </div>
                          ))}
                          <button
                            className="border border-base-300 hover:bg-base-200 w-10 h-10 card items-center justify-center flex cursor-pointer hover:bg-base-100"
                            onClick={() => setExpanded(true)}
                          >
                            <PlusIcon className="h-6 w-6" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default EmojiSelect;
