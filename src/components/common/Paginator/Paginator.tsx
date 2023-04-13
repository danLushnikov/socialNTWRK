import React, { useState } from 'react'
import s from './Paginator.module.css'

type Props = {
	totalItemsCount: number
	pageSize: number
	currentPage: number
	onPageChange: (pageNumber: number) => void
	portionSize?: number
}

let Paginator: React.FC<Props> = ({
	totalItemsCount,
	pageSize,
	currentPage,
	onPageChange,
	portionSize = 10,
}) => {
	let pagesCount = Math.ceil(totalItemsCount / pageSize)
	let pages = []
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i)
	}

	let allPortionCounts = Math.ceil(pagesCount / portionSize)
	let [portionNumber, setPortionNumber] = useState(1)

	let beginningOfPortion = (portionNumber - 1) * portionSize + 1
	let endingOfPortion = portionNumber * portionSize

	return (
		<div className={s.paginator}>
			{portionNumber > 1 && (
				<button
					onClick={() => {
						setPortionNumber(portionNumber - 1)
					}}
				>
					Prev
				</button>
			)}
			{pages
				.filter(p => p >= beginningOfPortion && p <= endingOfPortion)
				.map(pageNumber => {
					return (
						<span
							key={pageNumber}
							className={
								currentPage === pageNumber ? s.selectedPage : undefined
							}
							onClick={() => {
								onPageChange(pageNumber)
							}}
						>
							{pageNumber}
						</span>
					)
				})}
			{allPortionCounts > portionNumber && (
				<button
					onClick={() => {
						setPortionNumber(portionNumber + 1)
					}}
				>
					Next
				</button>
			)}
		</div>
	)
}
export default Paginator
