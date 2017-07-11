import React from 'react';
import {shallow} from 'enzyme';
import RegisterView from '../../../src/component/register/register-view';
import {expect} from 'chai';
import sinon from 'sinon';

describe('RegisterView Component', () => {
    it('renders component', () => {
        const wrapper = shallow(<RegisterView/>);

        expect(wrapper.length).to.equal(1);
    });

    describe('Upload Button', () => {
        it('disables upload button', () => {
            const wrapper = shallow(<RegisterView uploadEnabled={false}/>);

            let upload = wrapper.find("button.btn-default");

            expect(upload.html().includes('disabled=""')).to.be.true;
        });

        it('enables upload button', () => {
            const wrapper = shallow(<RegisterView uploadEnabled={true}/>);

            let upload = wrapper.find("button.btn-default");

            expect(upload.html().includes('disabled=""')).to.be.false;
        });

        it('runs onUploadClick on click', () => {
            let handler = sinon.spy();

            const wrapper = shallow(<RegisterView onUploadClick={handler}/>);

            let upload = wrapper.find("button.btn-default");
            upload.simulate("click");

            expect(handler.called).to.be.true;
        });
    });

    describe('Register Button', () => {
        it('disables submit button', () => {
            const wrapper = shallow(<RegisterView submitEnabled={false}/>);

            let register = wrapper.find("button.btn-primary");

            expect(register.html().includes('disabled=""')).to.be.true;
        });

        it('disables submit button', () => {
            const wrapper = shallow(<RegisterView submitEnabled={true}/>);

            let register = wrapper.find("button.btn-primary");

            expect(register.html().includes('disabled=""')).to.be.false;
        });

        it('runs onSubmitClick on click', () => {
            let handler = sinon.spy();
            const wrapper = shallow(<RegisterView onSubmitClick={handler}/>);

            let register = wrapper.find("button.btn-primary");

            register.simulate('click');
            
            expect(handler.called).to.be.true;
        });
    });
    
    describe('File Chooser', () => {
        it('runs onImageChange on file choose', () => {
            let handler = sinon.spy();
            const wrapper = shallow(<RegisterView onImageChange={handler}/>);

            let fileChooser = wrapper.find('input[type="file"]');

            fileChooser.simulate("change", {data: "data"});

            expect(handler.calledWith({data: "data"})).to.be.true;
        });
    });
});