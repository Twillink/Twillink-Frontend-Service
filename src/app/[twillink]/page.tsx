import WidgetEditor from '@/components/WidgetEditor';
import {notFound} from 'next/navigation';
import {FC} from 'react';
import {dummyWidget} from '@/mock/data';

interface User {
  name: string;
  bio: string;
  dataWidget: any[];
}

interface MockUsers {
  [key: string]: User;
}

const fetchUserByUsername = async (username: string): Promise<User | null> => {
  const mockUsers: MockUsers = {
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

interface TwillinkPageProps {
  params: {
    twillink: string;
  };
}

const TwillinkPage: FC<TwillinkPageProps> = async ({params}) => {
  const {twillink} = params;
  const data = await fetchUserByUsername(twillink);

  if (!data) {
    return notFound();
  }

  return (
    <div data-theme="light" className="h-full bg-base-100">
      <div className="flex flex-col items-center justify-center">
        <div className="h-screen max-w-[428px]">
          <WidgetEditor dataWidget={data.dataWidget} isEditingDisabled />
        </div>
      </div>
    </div>
  );
};

export default TwillinkPage;
