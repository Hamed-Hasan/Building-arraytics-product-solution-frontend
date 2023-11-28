/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import '../Table/Table.css';
import { BiShowAlt } from 'react-icons/bi';
import { MdAddchart } from 'react-icons/md';
import { FiEdit3 } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';
import SearchBar from '../../common/SearchBar';
import Loading from '../../shared/Loading/Loading';
import { useGetItemsQuery } from '../../services/authQueries';
import { useState } from 'react';
import { useEffect } from 'react';

const ItemList = () => {
  const { data: items, isLoading, isError } = useGetItemsQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  useEffect(() => {
    // Update filteredItems when items are successfully fetched
    if (items?.data) {
      setFilteredItems(items.data);
    }
  }, [items]);

  const handleSearch = () => {
    const searchTerm = searchQuery.toLowerCase();
    const filtered = items?.data?.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.created_by.toLowerCase().includes(searchTerm)
    );

    setFilteredItems(filtered);
  };

  const { isOpen: isShowModalOpen, onOpen: onShowModalOpen, onClose: onShowModalClose } = useDisclosure();
  const { isOpen: isAddModalOpen, onOpen: onAddModalOpen, onClose: onAddModalClose } = useDisclosure();
  const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure();

  if (isLoading) return <Loading/>
  if (isError) return <p>Error fetching items</p>;

  const handleShowModal = () => {
    onShowModalOpen();
  };

  const handleAddModal = () => {
    onAddModalOpen();
  };

  const handleEditModal = () => {
    onEditModalOpen();
  };

  const getBackgroundColor = (createdBy) => {
    switch (createdBy) {
      case 'admin':
        return 'bg-green-400';
      case 'super admin':
        return 'bg-yellow-400';
      case 'customer':
        return 'bg-red-400';
      default:
        return '';
    }
  };

  
      
    return (
        <div className="flex justify-center">
            <div className="container mx-auto">
    

                {/* SearchBar component */}
                <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          loading={isLoading}
        />


                {isLoading ? (
          <Loading />
        ) : (
                <>
                    {/* Display table data here */}
                    <div class="flex items-center justify-center  bg-gray-900">
                        <div class="col-span-12">
                            <div class="overflow-auto lg:overflow-visible ">
                            <table className="blog-table text-gray-400 border-separate space-y-6 text-sm">
  <thead className="bg-gray-800 text-gray-500">
    <tr>
      <th className="p-3">Index</th>
      <th className="p-3 text-left">Name</th>
      <th className="p-3 text-left">Date</th>
      <th className="p-3 text-left">Author</th>
      <th className="p-3 text-left">Action</th>
    </tr>
  </thead>
  <tbody>
    {filteredItems?.map((item, index) => (
      <tr key={item._id} className={index % 2 === 0 ? 'bg-gray-800' : ''}>
        <td className="p-3">
          <div className="flex align-items-center">
            <div className="ml-3">
              <div className="">{index + 1}</div>
            </div>
          </div>
        </td>
        <td className="p-3">{item.name}</td>
        <td className="p-3">{new Date(item.created_at).toLocaleDateString()}</td>
        <td className="p-3"> <span className={`text-gray-50 rounded-md px-2 ${getBackgroundColor(item.created_by)}`}>
    {item.created_by}
  </span> </td>
        <td className="blog-td p-3 flex justify-start gap-5 items-center mt-3">
            <a href="#" className="text-gray-400 hover:text-gray-100 mr-2" onClick={() => handleShowModal()}>
                <BiShowAlt size={18} />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-100 ml-2" onClick={() => handleAddModal()}>
                <MdAddchart />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-100 ml-2" onClick={() => handleEditModal()}>
                <FiEdit3 />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-100 ml-2" onClick={() => handleDeleteBlog()}>
                <RiDeleteBin6Line />
            </a>
        </td>
      </tr>
    ))}
  </tbody>


</table>

                            </div>
                        </div>
                    </div>

                    {/* Pagination component */}

                </>
                )}

                {/* Show Modal */}

                <Modal isCentered isOpen={isShowModalOpen} onClose={onShowModalClose} size='xl'>
                    <ModalOverlay
                        bg='blackAlpha.300'
                        backdropFilter='blur(10px) hue-rotate(90deg)'
                    />
                    <ModalContent>

                        <>

                            <ModalCloseButton />

                            <main class="mt-10">

                                <div class="mb-4 md:mb-0 w-full max-w-screen-md mx-auto relative" style={{ height: '24em' }}>
                                    <div class="absolute left-0 bottom-0 w-full h-full z-10"
                                        style={{
                                            backgroundImage: 'linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.7))',
                                        }}></div>
                                    {/* <img src={selectedBlog.image} /> */}
                                    <div class="p-4 absolute bottom-0 left-0 z-20">
                                        <a href="#"
                                            class="px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2">badges</a>
                                        <h2 class="text-4xl font-semibold text-gray-100 leading-tight">
                                            title
                                        </h2>
                                        <div class="flex mt-3">
                                            <div>
                                                <p class="font-semibold text-gray-200 text-sm">Author </p>
                                                <p class="font-semibold text-gray-400 text-xs">Published </p>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="px-4 lg:px-0 mt-12 text-gray-400 max-w-screen-md mx-auto text-lg leading-relaxed">






                                </div>
                            </main>
                        </>

                    </ModalContent>
                </Modal>


                {/* Add Modal */}
                {/* Implement your Add modal content here */}
                <Modal isCentered isOpen={isAddModalOpen} onClose={onAddModalClose} size='2xl'>
                    {/* Add modal content */}
                    {/* Implement your Add modal content here */}
                    <ModalOverlay
                        bg='blackAlpha.300'
                        backdropFilter='blur(10px) hue-rotate(90deg)'
                    />
                    <ModalContent>
                        <ModalCloseButton />
                        <ModalBody>
                            {/* Add modal body */}
                            {/* Implement your Add modal body content here */}
                            {/* <AddBlog onClose={onAddModalClose}/> */}
                            add
                        </ModalBody>
                    </ModalContent>
                </Modal>

                {/* Edit Modal */}
                <Modal isCentered isOpen={isEditModalOpen} onClose={onEditModalClose}>
                    <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
                    <ModalContent>
                        <ModalHeader color="whiteAlpha.800">Edit Blog</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {/* Display the BlogUpdateForm component */}
                            update blog
                        </ModalBody>
                    </ModalContent>
                </Modal>

            </div>
        </div>
    );
};

export default ItemList;