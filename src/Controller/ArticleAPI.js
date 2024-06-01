import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CCol,
  CTable,
  CTableBody,
  CTableHead,
  CTableDataCell,
  CButton,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import {
  collection,
  doc,
  setDoc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteField,
  deleteDoc,
} from 'firebase/firestore'
import { db } from '../firebase'
import { cilArrowRight, cilColorBorder, cilDelete, cilPlus, cilSearch } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

//Adding Artical Functions - Tran Duc Quang
const AddingArticleModal = ({ articleId }) => {
  const [visibleLg, setVisibleLg] = useState(false)
  const [image, setImage] = useState('')
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [datePublished, setDatePublished] = useState('')
  const [author, setAuthor] = useState([])
  const [inputAuthor, setInputAuthor] = useState('')
  const [url, setURL] = useState('')
  const [message, setMessage] = useState({ text: '', type: '' })
  const [deleteauthormodal, showdeleteauthormodal] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState(null)
  const [sources, setSources] = useState([])
  const [sourceschoosen, setSourceschoosen] = useState()
  const EditData = async (articleId) => {
    if (name === undefined || title === undefined || datePublished === undefined) {
      console.error('One of the values is undefined')
      return
    }
    await addDoc(collection(db, 'article'), {
      image: image,
      name: name,
      title: title,
      datePublished: new Date(),
      url: url,
      source: sourceschoosen,
      view: 0,
      author: author,
    })
      .then(() => {
        setMessage({ text: 'Data saved successfully', type: 'success' })
      })
      .catch(() => {
        setMessage({ text: 'Error adding document: ', type: 'error' })
      })
  }
  const handleAddAuthor = () => {
    setAuthor([...author, inputAuthor])
    setInputAuthor('')
  }
  useEffect(() => {
    if (visibleLg) {
      const fetchData = async () => {
        const docRef = doc(db, 'article', articleId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setImage(docSnap.data().image)
          setName(docSnap.data().name)
          setTitle(docSnap.data().title)
          setDatePublished(docSnap.data().datePublished?.toDate().toLocaleString() || '')
          setURL(docSnap.data().url)
          setSourceschoosen(docSnap.data().source)
          setAuthor(docSnap.data().author || [])
        } else {
          console.log('No such document!')
        }
      }
      fetchData()
      console.log('fetch data')
    }
  }, [visibleLg])
    useEffect(() => {
      const fetchSources = async () => {
        const querySnapshot = await getDocs(collection(db, 'source'))
        const tempArray = querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            sourceId: doc.id,
          }
        })
        setSources(tempArray)
      }

      fetchSources()
    }, [])
  const closemodel = () => {
    setVisibleLg(false)
    setMessage({ text: '', type: '' })
  }
  const handleClose = () => showdeleteauthormodal(false)
  const handleShow = (index) => {
    setDeleteIndex(index)
    showdeleteauthormodal(true)
  }
  const handleDelete = () => {
    setAuthor(author.filter((_, index) => index !== deleteIndex))
    handleClose()
  }
  return (
    <>
      <CButton className="custombuttonadd" color="success" onClick={() => setVisibleLg(!visibleLg)}>
        <CIcon icon={cilPlus} />
      </CButton>
      <CModal alignment="center" size="lg" visible={visibleLg} onClose={() => setVisibleLg(false)}>
        <CModalHeader className="custom-modal-header">
          <CModalTitle>Adding News Article</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <span className="custom-text-color">
            <h6 className=".custom-textcolor-red">Item information :</h6>
          </span>
          <CCol xs={12}>
            <CCardBody>
              <CInputGroup className="custom-input-group">
                <CInputGroupText className="custom-input-group-text">Image URL</CInputGroupText>
                <CFormInput
                  aria-label="Image URL"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </CInputGroup>
              <CInputGroup className="custom-input-group" style={{ width: 350 }}>
                <CInputGroupText className="custom-input-group-text">Author</CInputGroupText>
                <CFormInput
                  aria-label="Input Author"
                  placeholder="Add More..."
                  value={inputAuthor}
                  onChange={(e) => setInputAuthor(e.target.value)}
                />
                <CButton
                  color="success"
                  className="button-add-topic"
                  style={{ width: 40 }}
                  onClick={handleAddAuthor}
                >
                  <CIcon icon={cilArrowRight} className="me-2" />
                </CButton>
              </CInputGroup>
              {author.map((item, index) => (
                <CButton
                  color="success"
                  shape="rounded-pill"
                  key={index}
                  className="button-topic"
                  onClick={() => handleShow(index)}
                >
                  {item}
                </CButton>
              ))}
              <CModal alignment="center" visible={deleteauthormodal} onClose={handleClose}>
                <CModalHeader className="custom-modal-header-delete">
                  <CModalTitle>Confirm Deletion</CModalTitle>
                </CModalHeader>
                <CModalBody>Are you sure you want to delete this author?</CModalBody>
                {message.text && (
                  <div className={`alert alert-${message.type === 'error' ? 'danger' : 'success'}`}>
                    {message.text}
                  </div>
                )}
                <CModalFooter>
                  <CButton color="secondary" onClick={handleClose}>
                    Close
                  </CButton>
                  <CButton color="danger" onClick={handleDelete}>
                    Delete
                  </CButton>
                </CModalFooter>
              </CModal>
              <br />
              <br />
              <CInputGroup className="custom-input-group">
                <CInputGroupText className="custom-input-group-text">Title</CInputGroupText>
                <CFormInput
                  aria-label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </CInputGroup>
              <CFormSelect
                className="-input-select"
                aria-label="Default select example"
                value={sourceschoosen}
                onChange={(e) => setSourceschoosen(e.target.value)}
              >
                {sources.map((source, index) => (
                  <option
                    key={index}
                    value={JSON.stringify(source)}
                    className="custom-input-select-active"
                  >
                    {source.name}
                  </option>
                ))}
              </CFormSelect>
              <br />
              <CInputGroup className="custom-input-group">
                <CInputGroupText className="custom-input-group-text">
                  Date Published
                </CInputGroupText>
                <CFormInput
                  disabled={true}
                  aria-label="Date Published"
                  value={new Date().toLocaleString('en-US')}
                  onChange={(e) => setDatePublished(e.target.value)}
                />
              </CInputGroup>
              <CInputGroup className="custom-input-group">
                <CInputGroupText className="custom-input-group-text">URL</CInputGroupText>
                <CFormInput aria-label="URL" value={url} onChange={(e) => setURL(e.target.value)} />
              </CInputGroup>
            </CCardBody>
          </CCol>
        </CModalBody>
        {message.text && (
          <div className={`alert alert-${message.type === 'error' ? 'danger' : 'success'}`}>
            {message.text}
          </div>
        )}
        <CModalFooter>
          <CButton color="secondary" onClick={() => closemodel()}>
            Close
          </CButton>
          <CButton color="primary" onClick={() => EditData(articleId)}>
            Save changes
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

//Editing Artical Functions - Tran Duc Quang
const EditArticleModal = ({ articleId }) => {
  const [visibleLg, setVisibleLg] = useState(false)
  const [image, setImage] = useState('')
  const [title, setTitle] = useState('')
  const [datePublished, setDatePublished] = useState('')
  const [author, setAuthor] = useState([])
  const [inputAuthor, setInputAuthor] = useState('')
  const [url, setURL] = useState('')
  const [message, setMessage] = useState({ text: '', type: '' })
  const [deleteauthormodal, showdeleteauthormodal] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState(null)
  const [sources, setSources] = useState([])
  const [sourceschoosen, setSourceschoosen] = useState()

  const EditData = async (articleId) => {
    if (author === undefined || title === undefined || datePublished === undefined) {
      console.error('One of the values is undefined')
      return
    }
    const dbRef = doc(db, 'article', articleId)
    await updateDoc(dbRef, {
      image: image,
      author: author,
      title: title,
      url: url,
      source: sourceschoosen,
    })
      .then(() => {
        setMessage({ text: 'Data saved successfully', type: 'success' })
      })
      .catch(() => {
        setMessage({ text: 'Error adding document: ', type: 'error' })
      })
  }

  const handleAddAuthor = () => {
    setAuthor([...author, inputAuthor])
    setInputAuthor('')
  }
  useEffect(() => {
    if (visibleLg) {
      const fetchData = async () => {
        const docRef = doc(db, 'article', articleId)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setImage(docSnap.data().image)
          setTitle(docSnap.data().title)
          setDatePublished(docSnap.data().datePublished?.toDate().toLocaleString() || '')
          setURL(docSnap.data().url)
          setSourceschoosen(docSnap.data().source)
          setAuthor(docSnap.data().author || [])
        } else {
          console.log('No such document!')
        }
      }
      fetchData()
      console.log('fetch data')
    }
  }, [visibleLg])
  useEffect(() => {
  const fetchSources = async () => {
    const querySnapshot = await getDocs(collection(db, 'source'))
    const tempArray = querySnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        sourceId: doc.id,
      }
    })
    setSources(tempArray)
  }

    fetchSources()
  }, [])
  const closemodel = () => {
    setVisibleLg(false)
    setMessage({ text: '', type: '' })
  }
  const handleClose = () => showdeleteauthormodal(false)
  const handleShow = (index) => {
    setDeleteIndex(index)
    showdeleteauthormodal(true)
  }
  const handleDelete = () => {
    setAuthor(author.filter((_, index) => index !== deleteIndex))
    handleClose()
  }
  return (
    <>
      <CButton color="primary" onClick={() => setVisibleLg(!visibleLg)}>
        <CIcon icon={cilColorBorder} />
      </CButton>
      <CModal alignment="center" size="lg" visible={visibleLg} onClose={() => setVisibleLg(false)}>
        <CModalHeader className="custom-modal-header-edit">
          <CModalTitle>Edit Article</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <span className="custom-text-color">
            <h6 className=".custom-textcolor-red">Item information :</h6>
          </span>
          <CCol xs={12}>
            <CCardBody>
              <CInputGroup className="custom-input-group">
                <CInputGroupText className="custom-input-group-text">Image URL</CInputGroupText>
                <CFormInput
                  aria-label="Image URL"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </CInputGroup>
              <CInputGroup className="custom-input-group" style={{ width: 350 }}>
                <CInputGroupText className="custom-input-group-text">Author</CInputGroupText>
                <CFormInput
                  aria-label="Input Author"
                  placeholder="Add More..."
                  value={inputAuthor}
                  onChange={(e) => setInputAuthor(e.target.value)}
                />
                <CButton
                  color="success"
                  className="button-add-topic"
                  style={{ width: 40 }}
                  onClick={handleAddAuthor}
                >
                  <CIcon icon={cilArrowRight} className="me-2" />
                </CButton>
              </CInputGroup>
              {author.map((item, index) => (
                <CButton
                  color="success"
                  shape="rounded-pill"
                  key={index}
                  className="button-topic"
                  onClick={() => handleShow(index)}
                >
                  {item}
                </CButton>
              ))}
              <CModal alignment="center" visible={deleteauthormodal} onClose={handleClose}>
                <CModalHeader className="custom-modal-header-delete">
                  <CModalTitle>Confirm Deletion</CModalTitle>
                </CModalHeader>
                <CModalBody>Are you sure you want to delete this author?</CModalBody>
                {message.text && (
                  <div className={`alert alert-${message.type === 'error' ? 'danger' : 'success'}`}>
                    {message.text}
                  </div>
                )}
                <CModalFooter>
                  <CButton color="secondary" onClick={handleClose}>
                    Close
                  </CButton>
                  <CButton color="danger" onClick={handleDelete}>
                    Delete
                  </CButton>
                </CModalFooter>
              </CModal>
              <br />
              <br />
              <CInputGroup className="custom-input-group">
                <CInputGroupText className="custom-input-group-text">Title</CInputGroupText>
                <CFormInput
                  aria-label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </CInputGroup>
              <CFormSelect
                className="-input-select"
                aria-label="Default select example"
                value={sourceschoosen}
                onChange={(e) => setSourceschoosen(e.target.value)}
              >
                {sources.map((source, index) => (
                  <option
                    key={index}
                    value={`/source/${source.sourceId}`} // value={JSON.stringify(source)}
                    className="custom-input-select-active"
                  >
                    {source.name}
                  </option>
                ))}
              </CFormSelect>
              <br />
              <CInputGroup className="custom-input-group">
                <CInputGroupText className="custom-input-group-text">
                  Date Published
                </CInputGroupText>
                <CFormInput
                  disabled={true}
                  aria-label="Date Published"
                  value={datePublished}
                  onChange={(e) => setDatePublished(e.target.value)}
                />
              </CInputGroup>
              <CInputGroup className="custom-input-group">
                <CInputGroupText className="custom-input-group-text">URL</CInputGroupText>
                <CFormInput aria-label="URL" value={url} onChange={(e) => setURL(e.target.value)} />
              </CInputGroup>
            </CCardBody>
          </CCol>
        </CModalBody>
        {message.text && (
          <div className={`alert alert-${message.type === 'error' ? 'danger' : 'success'}`}>
            {message.text}
          </div>
        )}
        <CModalFooter>
          <CButton color="secondary" onClick={() => closemodel()}>
            Close
          </CButton>
          <CButton color="primary" onClick={() => EditData(articleId)}>
            Save changes
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

//Deleting Artical Functions - Tran Duc Quang
const DeleteArticleModal = ({ articleId }) => {
  const [message, setMessage] = useState({ text: '', type: '' })

  const [visible, setVisible] = useState(false)

  const DeleteData = async (articleId) => {
    const dbRef = doc(db, 'article', articleId)
    await deleteDoc(dbRef)
      .then(() => {
        setMessage({ text: 'Data removed successfully', type: 'success' })
      })
      .catch(() => {
        setMessage({ text: 'Error removing document: ', type: 'error' })
      })
  }

  const closemodel = () => {
    setVisible(false)
    setMessage({ text: '', type: '' })
  }
  return (
    <>
      <CButton color="danger" onClick={() => setVisible(!visible)}>
        <CIcon icon={cilDelete} />
      </CButton>
      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader className="custom-modal-header-delete">
          <CModalTitle>Delete Item</CModalTitle>
        </CModalHeader>
        <CModalBody>Are you sure to delete this item?</CModalBody>
        {message.text && (
          <div className={`alert alert-${message.type === 'error' ? 'danger' : 'success'}`}>
            {message.text}
          </div>
        )}
        <CModalFooter>
          <CButton color="secondary" onClick={() => closemodel()}>
            Close
          </CButton>
          <CButton color="danger" onClick={() => DeleteData(articleId)}>
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

//Show Artical Functions - Tran Duc Quang
const ShowArticle = () => {
  let [article, setArticle] = useState([])
  let [search, setSearch] = useState('')

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, 'article'))
    const tempArray = querySnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        articleId: doc.id,
      }
    })
    setArticle(tempArray)
  }

  useEffect(() => {
    fetchData()
  }, [])

  console.log('fetch data')

  const filteredArticles = article.filter(
    (article) =>
      (article.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (article.title || '').toLowerCase().includes(search.toLowerCase()) ||
      (new Date(article.datePublished.toDate() || '').toLocaleString() || '')
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (article.url || '').toLowerCase().includes(search.toLowerCase()),
  )

  let [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage)
  const currentItems = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )
  const maxPageNumbersToShow = 10
  let startPage = Math.max(currentPage - Math.floor(maxPageNumbersToShow / 2), 1)
  let endPage = Math.min(startPage + maxPageNumbersToShow - 1, totalPages)

  // Adjust if we're at the end of the page numbers
  if (endPage === totalPages) {
    startPage = Math.max(endPage - maxPageNumbersToShow + 1, 1)
  }

  return (
    <>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
        className="searchInput"
      />
      <CCardBody>
        <CTable striped align="middle" className="mb-0 border" hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell className="bg-body-tertiary" scope="col"></CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary" scope="col">
                Author
              </CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary" scope="col">
                Title
              </CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary" scope="col">
                Date Published
              </CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary" scope="col">
                <CIcon icon={cilSearch} />
              </CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary" scope="col"></CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <>
              {currentItems.map((article, index) => (
                <>
                  <div key={index}></div>
                  <CTableRow>
                    <CTableDataCell>
                      <img src={article.image} alt="image" className="logo-image" />
                    </CTableDataCell>
                    <CTableDataCell>{article.author.join(', ')}</CTableDataCell>
                    <CTableDataCell> {article.title}</CTableDataCell>
                    <CTableDataCell>
                      {article.datePublished?.toDate().toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })}
                    </CTableDataCell>
                    <CTableDataCell>{article.view}</CTableDataCell>
                    <CTableDataCell className="button-container">
                      <div className="edit-modal">
                        <EditArticleModal articleId={article.articleId} />
                      </div>
                      <div className="delete-modal">
                        <DeleteArticleModal articleId={article.articleId} />
                      </div>
                    </CTableDataCell>
                  </CTableRow>
                </>
              ))}
            </>
          </CTableBody>
        </CTable>
        <br />
        <CPagination aria-label="Page navigation example">
          <CPaginationItem
            aria-label="Previous"
            onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))} // Decrease currentPage by 1, but not less than 1
          >
            <span aria-hidden="true">&laquo;</span>
          </CPaginationItem>
          {[...Array(endPage - startPage + 1)].map((_, index) => {
            const pageNumber = startPage + index
            return (
              <CPaginationItem
                key={index}
                active={pageNumber === currentPage} // Highlight this item if its page number is the current page
                onClick={() => setCurrentPage(pageNumber)} // Set currentPage to the clicked page number
              >
                {pageNumber}
              </CPaginationItem>
            )
          })}
          <CPaginationItem
            aria-label="Next"
            onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))} // Increase currentPage by 1, but not more than totalPages
          >
            <span aria-hidden="true">&raquo;</span>
          </CPaginationItem>
        </CPagination>
        <AddingArticleModal />
      </CCardBody>
    </>
  )
}
export default ShowArticle

export { ShowArticle }
