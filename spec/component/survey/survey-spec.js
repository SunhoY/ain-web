import React from 'react';
import {shallow} from 'enzyme';
import fetchMock from 'fetch-mock';
import {expect} from 'chai';
import Survey, {S3_URL, AIN_IMAGES_BUCKET} from "../../../src/component/survey/survey";

const FACE_BASE_API_URL = "https://eb94bqr34l.execute-api.us-east-1.amazonaws.com/test/facebase";

describe('Survey Spec', () => {
    let wrapper;

    beforeEach((done) => {
        fetchMock.mock({
            method: "GET",
            matcher: `${FACE_BASE_API_URL}?gender=Female`,
            response: [
                {
                    fileName: "image1.jpg"
                },
                {
                    fileName: "image2.jpg"
                }
            ]
        });

        wrapper = shallow(<Survey gender="Female"/>, {
            options: {
                disableLifecycleMethods: true
            }
        });

        wrapper.instance().componentWillMount().then(() => {
            done();
        });
    });

    it('fetches facebase rest api depends on gender property', () => {
        expect(fetchMock.called(`${FACE_BASE_API_URL}?gender=Female`)).to.be.true;
    });

    it('changes faceBases state', () => {
        expect(wrapper.state("faceBases")).to.eql([
            {
                fileURL: `${S3_URL}/${AIN_IMAGES_BUCKET}/image1.jpg`,
                fileName: "image1.jpg"
            },
            {
                fileURL: `${S3_URL}/${AIN_IMAGES_BUCKET}/image2.jpg`,
                fileName: "image2.jpg"
            }
        ]);
    });

    it('sets first face image as showingFaceBase state', () => {
        expect(wrapper.state('showingFaceBase')).to.eql({
            fileURL: `${S3_URL}/${AIN_IMAGES_BUCKET}/image1.jpg`,
            fileName: "image1.jpg"
        });
    });

    describe('Like Click', () => {
        it('changes showingIndex state', () => {
            expect(wrapper.state("showingIndex")).to.equal(0);

            wrapper.instance().onLikeClick();

            expect(wrapper.state("showingIndex")).to.equal(1);
        });

        it('changes showingURL', () => {
            wrapper.instance().onLikeClick();

            expect(wrapper.state("showingFaceBase")).to.eql({
                fileURL: `${S3_URL}/${AIN_IMAGES_BUCKET}/image2.jpg`,
                fileName: "image2.jpg"
            });
        });

        it('adds preference with file name and boolean true', () => {
            wrapper.instance().onLikeClick();

            const preferences = wrapper.state("preferences");
            const faceBases = wrapper.state("faceBases");

            expect(preferences.length).to.equal(1);
            expect(preferences[0]).to.eql(Object.assign({}, faceBases[0], {preference: true}));
        });
    });

    describe('Dislike Click', () => {
        it('changes showingIndex state', () => {
            expect(wrapper.state("showingIndex")).to.equal(0);

            wrapper.instance().onDislikeClick();

            expect(wrapper.state("showingIndex")).to.equal(1);
        });

        it('changes showingURL', () => {
            wrapper.instance().onDislikeClick();

            expect(wrapper.state("showingFaceBase")).to.eql({
                fileURL: `${S3_URL}/${AIN_IMAGES_BUCKET}/image2.jpg`,
                fileName: "image2.jpg"
            });
        });

        it('adds preference with file name and boolean false', () => {
            wrapper.instance().onDislikeClick();

            const preferences = wrapper.state("preferences");
            const faceBases = wrapper.state("faceBases");

            expect(preferences.length).to.equal(1);
            expect(preferences[0]).to.eql(Object.assign({}, faceBases[0], {preference: false}));
        });
    });
});