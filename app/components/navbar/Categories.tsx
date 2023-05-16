'use client';

import React from 'react';
import Container from '../Container';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { MdOutlineVilla } from 'react-icons/md';
import { IoDiamond } from 'react-icons/io5';
import CategoryBox from '../CategoryBox';
import { usePathname, useSearchParams } from 'next/navigation';

export const categories = [
  {
    label: 'Sahile Yakın',
    icon: TbBeach,
    description: 'Bu ev sahile yakın!',
  },
  {
    label: 'Yel Değirmeni',
    icon: GiWindmill,
    description: 'Bu evin yel değirmeni var!',
  },
  {
    label: 'Modern',
    icon: MdOutlineVilla,
    description: 'Bu ev modern bir  dizayna sahip!',
  },
  {
    label: 'Kırsal',
    icon: TbMountain,
    description: 'Bu ev kırsal kesimde!',
  },
  {
    label: 'Havuzlu',
    icon: TbPool,
    description: 'Bu evin havuzu var!',
  },
  {
    label: 'Adalar',
    icon: GiIsland,
    description: 'Bu ev bir adada!',
  },
  {
    label: 'Göl Kenarı',
    icon: GiBoatFishing,
    description: 'Bu ev göle yakın!',
  },
  {
    label: 'Kayak',
    icon: FaSkiing,
    description: 'Bu ev kayak yapmaya uygun!',
  },
  {
    label: 'Şatolar',
    icon: GiCastle,
    description: 'Bu ev bir şatoda!',
  },
  {
    label: 'Kamp',
    icon: GiForestCamp,
    description: 'Bu ev kamp yapmaya uygun!',
  },
  {
    label: 'Kuzey Kutbu',
    icon: BsSnow,
    description: 'Bu ev kuzey kutbunda!',
  },
  {
    label: 'Mağara',
    icon: GiCaveEntrance,
    description: 'Bu ev bir mağarada!',
  },
  {
    label: 'Çöl',
    icon: GiCactus,
    description: 'Bu ev bir çölde!',
  },
  {
    label: 'Ahır',
    icon: GiBarn,
    description: 'Bu ev bir ahırda!',
  },
  {
    label: 'Lüks',
    icon: IoDiamond,
    description: 'Bu ev çok lüks!',
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathName = usePathname();

  const isMainPage = pathName === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
