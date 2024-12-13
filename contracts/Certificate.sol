// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract Certificate{

    struct Cert{
        string name;
        string course;
        string grade;
        string date;
    }
    address admin;

    constructor (){
        admin = msg.sender;
    }

    mapping (uint16 => Cert) public  certi;

    modifier onlyAdmin{
        require(msg.sender == admin, "Unauthorised access");
        _;
    }

    function issueCertificate( uint16 _id, string memory _name, string memory _course, string memory _grade, string memory _date) public onlyAdmin {
        certi[_id] = Cert(_name,_course,_grade,_date);
    }
}