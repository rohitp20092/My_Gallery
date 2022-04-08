import React, { useEffect, useState } from 'react';
import Header from '../Header/MainHeader/MainHeader';
import Gallery from '../Gallery/Gallery';
import MainPagination from '../Pagination/Pagination';

const yourApiKey = '784ecafdeda6c71793d6e3a90d802de9';



const MainComponents = () => {
	const [images, setImages] = useState();
	const [searchValue, setSearchValue] = useState("");
	const [filteredImages, setFilteredImages] = useState([]);
	const [page, setpage] = useState(1)

	const data = {
		method: 'flickr.photos.search',
		api_key: yourApiKey,
		text: 'butterfly',
		sort: 'interestingness-desc',
		per_page: 9,
		page: page,
		license: '4',
		extras: 'owner_name,license',
		format: 'json',
		nojsoncallback: 1,
	};

	const parameters = new URLSearchParams(data);

	const getFlickrImageURL = (photo, size) => {
		let url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`;
		if (size) {
			url += `_${size}`;
		}
		url += '.jpg';
		return url;
	};

	useEffect(() => {
		const url = `https://api.flickr.com/services/rest/?${parameters}`;
		fetch(url)
			.then((response) => (response.json()))
			.then((data) => {
				let finalData = [];
				data.photos.photo.map((photo) => {
					const imgUrl = getFlickrImageURL(photo);
					finalData.push({ ...photo, imgURL: imgUrl });
					return null
				})
				setImages(finalData)
			})
			.catch((error) => console.log(error))
			// eslint-react-hooks/exhaustive-deps
	}, [page])

	const handleSearchChange = (val) => {
		setSearchValue(val);
	}

	const sortHandler = (value) => {
		const myData = filteredImages
		.map((u) => u)
		.sort((a, b) => a.ownername.localeCompare(b.ownername));
		const myReverseData = filteredImages
		  .map((u) => u)
		  .sort((a, b) => b.ownername.localeCompare(a.ownername));
		if (value === "a") {
			setFilteredImages(myData);
		} else {
			setFilteredImages(myReverseData);
		}
	}

	useEffect(() => {
		if (searchValue !== "") {
			const items = images.filter((d) => {
				return d.title.toLowerCase().includes(searchValue.toLowerCase());
			});
			setFilteredImages(items)
		}
		else {
			setFilteredImages(images)
		}
	}, [searchValue, images]);

	const onChange = (val) => {
		setpage(val)
	}

	return (
		<>
			<Header searchValue={searchValue} handleSearchChange={handleSearchChange} sortHandler={sortHandler} />
			<Gallery images={filteredImages} />
			<MainPagination page={page} onChange={onChange} images={filteredImages} />
		</>
	)
}

export default MainComponents;