import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import { ReactNode } from 'react';

interface TabType {
    name: string
    children: ReactNode
}

interface TabListType {
    tabs: TabType[],
    selectedIndex: number,
    setSelectedIndex: (props: number) => void
}

const TabList = ({ tabs, selectedIndex, setSelectedIndex }: TabListType) => {
    return (
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
            <Tab.List className="card flex w-full flex-row gap-1 p-1 bg-base-200">
                {tabs.map((tab) => (
                    <Tab
                        key={tab.name}
                        className={({ selected }) =>
                            classNames({
                                'btn flex-1': true,
                                'btn-ghost': !selected,
                                'btn-primary': selected,
                            })
                        }
                    >
                        {tab.name}
                    </Tab>
                ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
                {tabs.map(e => (
                    <Tab.Panel key={e.name} className="w-full border card p-3">
                        {e.children}
                    </Tab.Panel>
                ))}
            </Tab.Panels>
        </Tab.Group>
    );
}

export default TabList;