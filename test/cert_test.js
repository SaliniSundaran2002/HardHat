const {loadFixture}  = require('@nomicfoundation/hardhat-toolbox/network-helpers');
const {expect} = require('chai');
const {ethers} = require('hardhat');

describe('Cert', ()=>{  //Cert is a module name and a callback function
    async function deployContract(){
        const [admin, other] =  await ethers.getSigners();
        const cert = await ethers.getContractFactory('Certificate') //create a instance of contract
        const Cert = await cert.deploy();
        return{Cert,admin,other};
    }
    it("Should be deployed only by admin",async function(){
        const {Cert,admin} = await loadFixture(deployContract);
        // console.log(Cert);
        expect(Cert.deploymentTransaction().from).to.equals(admin.address);
        
    }) //string and callback function

    it("Able to issue & read certificate", async function(){
        const {Cert,admin} = await loadFixture(deployContract);
        await Cert.issueCertificate(1,"Salini", "CBA", "A","10/11/2024");
        const Certi = await Cert.certi(1);
        console.log(Certi);
        expect(Certi[0]).to.equals("Salini");
        
    })

    it("Only admin can issue the certificate", async function () {
        const {Cert, other} = await loadFixture(deployContract);
        await expect(Cert.connect(other).issueCertificate(2,"Sam","CED","S","11/11/2024")).to.be.revertedWith("Unauthorised access");
        
    })
})