import React from 'react';
import {shallow} from 'enzyme';
import UploadView from '../../../src/component/upload/upload-view';
import {expect} from 'chai';
import sinon from 'sinon';

describe('UploadView Component', () => {
    it('renders component', () => {
        const wrapper = shallow(<UploadView/>);

        expect(wrapper.length).to.equal(1);
    });

    describe('Upload Button', () => {
        it('disables upload button', () => {
            const wrapper = shallow(<UploadView uploadEnabled={false}/>);

            let upload = wrapper.find("button.btn-default");

            expect(upload.html().includes('disabled=""')).to.be.true;
        });

        it('enables upload button', () => {
            const wrapper = shallow(<UploadView uploadEnabled={true}/>);

            let upload = wrapper.find("button.btn-default");

            expect(upload.html().includes('disabled=""')).to.be.false;
        });

        it('runs onUploadClick on click', () => {
            let handler = sinon.spy();

            const wrapper = shallow(<UploadView onUploadClick={handler}/>);

            let upload = wrapper.find("button.btn-default");
            upload.simulate("click");

            expect(handler.called).to.be.true;
        });
    });

    describe('Submit Button', () => {
        it('disables submit button', () => {
            const wrapper = shallow(<UploadView submitEnabled={false}/>);

            let submit = wrapper.find("button.btn-primary");

            expect(submit.html().includes('disabled=""')).to.be.true;
        });

        it('disables submit button', () => {
            const wrapper = shallow(<UploadView submitEnabled={true}/>);

            let submit = wrapper.find("button.btn-primary");

            expect(submit.html().includes('disabled=""')).to.be.false;
        });

        it('runs onSubmitClick on click', () => {
            let handler = sinon.spy();
            const wrapper = shallow(<UploadView onSubmitClick={handler}/>);

            let submit = wrapper.find("button.btn-primary");

            submit.simulate('click');
            
            expect(handler.called).to.be.true;
        });
    });
    
    describe('File Chooser', () => {
        it('runs onImageChange on file choose', () => {
            let handler = sinon.spy();
            const wrapper = shallow(<UploadView onImageChange={handler}/>)

            let fileChooser = wrapper.find('input[type="file"]');

            fileChooser.simulate("change", {data: "data"});

            expect(handler.calledWith({data: "data"})).to.be.true;
        });
    });
});