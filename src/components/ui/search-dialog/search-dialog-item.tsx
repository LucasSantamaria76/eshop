import { colors } from "@/constants";
import Image from "next/image";
import Link from "next/link";

/* interface Props {
	product: TProductInStore;
	indexItem: number;
	index: number;
}
 */
function SearchDialogItem(/* { product, indexItem, index }: Props */) {
  return (
    <>
      {/* <Link
			href={`/producto/${product.productID}`}
			className='relative flex items-center mb-1 border border-gray-300 rounded-md px-1 w-[98%]'>
			<div className='flex items-center gap-2 my-1'>
				<Image
					src={product.image}
					width={40}
					height={40}
					alt='Imagen del producto'
					className='border border-gray-300 rounded-md h-10'
				/>
				<div>
					<h2 className={`${redressed.className} flex items-center capitalize text-xl`}>
						{`${product.name.toLocaleLowerCase()}`}
					</h2>
					<div className='flex items-center gap-2'>
						<p className='flex items-center text-xs'>{`${product.category} / ${product.subCategory}`}</p>
						<div className='flex items-center gap-1'>
							{product.availableColours.map((color, idx) => (
								<div className={`rounded-full w-3 h-3 ${colors[color]}`} key={idx} />
							))}
						</div>
						<div className='flex items-center gap-1'>
							{product.availableSizes.map((size) => (
								<div
									className={`text-[8px] rounded-sm border border-black px-2`}
									key={size.sizes_id}>
									{size.name}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			{index === indexItem ? (
				<div className='transition duration-500 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25' />
			) : null}
			<div className='bg-transparent transition duration-500 absolute bottom-0 top-0 right-0 left-0 hover:bg-gray-900 opacity-25' />
		</Link> */}
    </>
  );
}
export default SearchDialogItem;
