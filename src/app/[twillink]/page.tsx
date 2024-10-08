import {notFound} from 'next/navigation';
import {FC} from 'react';
import {dummyWidget} from '@/mock/data';
import WidgetViewer from '@/components/WidgetViewer';
import {IItemWidgetType} from '@/libs/types/IItemWidgetType';

interface IUser {
  name: string;
  bio: string;
  dataWidget: IItemWidgetType[];
}

interface IMockUsers {
  [key: string]: IUser;
}

const fetchUserByUsername = async (username: string): Promise<IUser | null> => {
  const mockUsers: IMockUsers = {
    johndoe: {
      name: 'John Doe',
      bio: 'Software Developer',
      dataWidget: dummyWidget,
    },
    janedoe: {
      name: 'Jane Doe',
      bio: 'Graphic Designer',
      dataWidget: [],
    },
  };

  return mockUsers[username] || null;
};

interface ITwillinkPage {
  params: {
    twillink: string;
  };
}

const TwillinkPage: FC<ITwillinkPage> = async ({params}) => {
  const {twillink} = params;
  const data = await fetchUserByUsername(twillink);

  if (!data) {
    return notFound();
  }

  return (
    <div data-theme="light" className="h-full bg-base-100">
      <div className="flex flex-col items-center justify-center">
        <div className="h-screen max-w-[428px]">
          <WidgetViewer dataWidget={data.dataWidget} />
        </div>
      </div>
    </div>
  );
};

export default TwillinkPage;
