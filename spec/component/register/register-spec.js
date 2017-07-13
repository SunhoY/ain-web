import React from 'react';
import {shallow} from 'enzyme';
import Register from "../../../src/component/register/register";
import {expect} from 'chai';
import sinon from 'sinon';
import fetchMock from 'fetch-mock';
import {examineAPIHeadersAndCORS} from '../../examineAPIHeadersAndCORS';

const FACE_IMAGE_API_URL = "https://eb94bqr34l.execute-api.us-east-1.amazonaws.com/test/faceimage";
const FACE_BASE_API_URL = "https://eb94bqr34l.execute-api.us-east-1.amazonaws.com/test/facebase";

describe('Register Spec', () => {
    beforeEach(() => {
        let readAsDataURLStub = sinon.stub();

        global.FileReader = function () {
            this.readAsDataURL = readAsDataURLStub;

            readAsDataURLStub.callsFake(() => {
                this.result = "base64_encoded_image";
                this.onloadend();
            });
        };
    });

    it('onImageChange changes file and previewURL st', () => {
        const wrapper = shallow(<Register/>);

        wrapper.instance().onImageChange({
            target: {
                files: ["first_file"]
            }
        });

        expect(wrapper.state("file")).to.equal("first_file");
        expect(wrapper.state("previewURL")).to.equal("base64_encoded_image");
    });

    describe('Upload click handler', () => {
        let option,
            wrapper;

        beforeEach((done) => {
            fetchMock.mock({
                matcher: FACE_IMAGE_API_URL,
                method: "POST",
                response: {
                    storedFileName: "well_stored.jpg"
                }
            });

            wrapper = shallow(<Register/>);
            wrapper.setState({
                file: {
                    type: "image/png"
                },
                previewURL: "base64,file_binary"
            });

            wrapper.instance().onUploadClick().then(() => {
                done();
            });

            option = fetchMock.lastCall(FACE_IMAGE_API_URL)[1];
        });

        afterEach(() => {
            fetchMock.restore();
        });

        it('calls faceimage rest api', () => {
            expect(fetchMock.called(FACE_IMAGE_API_URL)).to.be.true;
        });

        it('sets header with API key, Content-Type and mode for cors', () => {
            const {headers, mode} = option;
            examineAPIHeadersAndCORS(headers, mode);
        });

        it('has body with base64Image String and file type', () => {
            const {body} = option;

            expect(body).to.eql(JSON.stringify({
                base64Image: "file_binary",
                fileType: "image/png"
            }));
        });

        it('sets s3FileName state', () => {
            let {s3FileName} = wrapper.state();

            expect(s3FileName).to.equal("well_stored.jpg");
        });
    });

    describe('Submit click handler', () => {
        let option,
            wrapper;

        beforeEach((done) => {
            fetchMock.mock({
                matcher: FACE_BASE_API_URL,
                method: "POST",
                response: {
                    data: "some data"
                }
            });

            wrapper = shallow(<Register/>);
            wrapper.setState({
                file: {
                    type: "image/png"
                },
                previewURL: "base64,file_binary"
            });

            wrapper.instance().onSubmitClick().then(() => {
                done();
            });

            option = fetchMock.lastCall(FACE_BASE_API_URL)[1];
        });

        afterEach(() => {
            fetchMock.restore();
        });

        it('sets header with API key, Content-Type and mode for cors', () => {
            const {headers, mode} = option;
            examineAPIHeadersAndCORS(headers, mode);
        });
    });
});
