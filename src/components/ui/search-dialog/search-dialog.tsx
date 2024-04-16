"use client";

import { TextInput } from "flowbite-react";
import { IoSearchOutline } from "react-icons/io5";
import { KeyboardEvent, useState } from "react";
import SearchDialogItem from "./search-dialog-item";
import { useRouter } from "next/navigation";

export const SearchDialog = () => {
  const [search, setSearch] = useState("");
  const [indexItem, setIndexItem] = useState(-1);
  const router = useRouter();
  /* const products = useShopStore.use
		.products()
		.filter((product) => product.name.toLowerCase().includes(search.toLowerCase())); */

  /* const handleChange = (e: KeyboardEvent<HTMLInputElement>) => {
		const optionKey = {
			Escape: () => setSearch(''),
			Enter: () => {
				if (indexItem >= 0 && products.length) {
					setSearch('');
					setIndexItem(-1);
					router.push(`/producto/${products[indexItem].productID}`);
				}
			},
			ArrowDown: () =>
				indexItem < products.length - 1 && search.length
					? setIndexItem(indexItem + 1)
					: setIndexItem(0),

			ArrowUp:
				indexItem > 0 && search.length
					? () => setIndexItem(indexItem - 1)
					: () => setIndexItem(products.length - 1),
		};
		//@ts-ignore
		Object.keys(optionKey).includes(e.key) && optionKey[e.key]();
	}; */

  return (
    <div className="relative w-1/2">
      <TextInput
        type="search"
        icon={IoSearchOutline}
        placeholder="Buscar producto..."
        className="w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        //onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleChange(e)}
      />
      {/* <div
				className={`absolute top-11 w-full h-auto p-2 bg-white rounded-md border border-gray-400 shadow shadow-black/80 z-50 ${
					products.length && search.length ? 'block' : 'hidden'
				}`}
				onClick={() => setSearch('')}>
				{products.length
					? products.map((product, index) => (
							<SearchDialogItem
								key={product.productID}
								product={product}
								indexItem={indexItem}
								index={index}
							/>
					  ))
					: null}
			</div> */}
    </div>
  );
};
