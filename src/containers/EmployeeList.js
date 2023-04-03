import React,{useEffect, useState} from 'react'
import user from "../api"
import { Table,Button ,Modal, ModalBody} from 'react-bootstrap';
export const EmployeeList = () => {
	const [employee, setEmployee]=useState([])
	const [employeeID, setEmployeeId]=useState("")
	const [ShowModels, setShowAppModal]=useState(false)
	// const [ShowModels2, setShowAppModal2]=useState(false)

const getAllEmployee=async()=>{

	const res=await user.getAllEmployees(1, 10)
	setEmployee(res)
	console.log(res)
}
useEffect(() => {
getAllEmployee()
}, [])

  return (
	<div className="center">
		<Table striped className='m-10'>
		  <thead>
			<tr>
			  <th>employeeNumber</th>
			  <th>employee Name</th>
			  <th>Employee salary</th>
			  <th>Action</th>
			</tr>
		  </thead>
		  <tbody>
			{
				employee.map((e)=>{
					return (
						<tr key={e.employeeID}>
						<td>
			{e.employeeNumber}
						</td>
						<td>
			{e.employeeName}
						</td>
						<td>
			{e.employeeSalary}
						</td>
						<td>
		<Button varient="warning"
		//   onClick={() => {
		// 	setShowAppModal2(true);
		// 	setEmployeeId(e?.employeeID);
		//   }}
		  >
Edit
		</Button>
						</td>
						<td>
						<Button
                      variant="success"
                      onClick={() => {
                        setShowAppModal(true);
                        setEmployeeId(e?.employeeID);
                      }}
                    >
                      Del
                    </Button>
						</td>
					</tr>

					
					)
				})
			}

		  </tbody>
		  <ShowModel ShowModels={ShowModels} employeeID={employeeID} setShowAppModal={setShowAppModal}/>
		</Table>
		</div>
	  );
}
	
	function ShowModel({ShowModels, setShowAppModal,employeeID}) {

	const getEmployeeByIds=async()=>{
		const res=await user.getEmployeeById(employeeID)
		console.log(res)
	}
	useEffect(()=>{
		getEmployeeByIds()
	},[])
	  const handleClose = () => setShowAppModal(false);
	  const handleShow = () => setShowAppModal(true);
	
	  return (
		<>
		  {/* <Button variant="primary" onClick={handleShow}>
			Launch demo modal
		  </Button> */}
	
		  <Modal show={ShowModels} onHide={handleClose}>
			<Modal.Header closeButton>
			  <Modal.Title>Modal heading</Modal.Title>
			</Modal.Header>
			<Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
			<Modal.Footer>
			  <Button variant="secondary" onClick={handleClose}>
				Close
			  </Button>
			  <Button variant="primary" onClick={handleClose}>
				Save Changes
			  </Button>
			</Modal.Footer>
		  </Modal>




		  {/* <Modal show={ShowModels2} onHide={handleClose}>
			<Modal.Header closeButton>
			  <Modal.Title>Modal heading</Modal.Title>
			</Modal.Header>
			<Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
			<Modal.Footer>
			  <Button variant="secondary" onClick={handleClose}>
				Close
			  </Button>
			  <Button variant="primary" onClick={handleClose}>
				Save Changes
			  </Button>
			</Modal.Footer>
		  </Modal> */}
		</>
	  );
	}
	
