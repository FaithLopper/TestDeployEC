import React from 'react'
import { Form, Image, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

export const CompareGeneralPanel = (props) => {
    return (
        <>
            <Form.Group className="my-3 text-center" id="formGridCheckbox">
                <Image alt="cardimage" src={props.image} width={250} />
            </Form.Group>
            <Form.Label>Tình trạng</Form.Label>
            <Form.Control disabled value={props.isIssuing ? 'Đang phát hành' : 'Dừng phát hành'} placeholder="cardname" />

            <Form.Label>Tên Thẻ</Form.Label>
            <Form.Control disabled value={props.cardName} placeholder="cardname" />

            <Form.Label>Mô tả</Form.Label>
            <Form.Control disabled value={props.description} as="textarea" style={{ height: '100px' }} placeholder="cardname" />

            <Form.Label>Nhà phát hành</Form.Label>
            <Form.Control disabled value={props.publisher} placeholder="cardpublisher" />

            <Form.Label>Loại Thẻ</Form.Label>
            <Form.Control disabled value={
                props.cardType === 'intCredits' ? 'Thẻ tín dụng'
                    : props.cardType === 'intDebits' ? 'Thẻ ghi nợ Quốc Tế'
                        : props.cardType === 'domDebits' ? 'Thẻ ghi nợ Nội Địa'
                            : ''
            } placeholder="cardtype" />

            <Form.Label>Cấp Thẻ</Form.Label>
            <Form.Control disabled value={props.cardRank} placeholder="cardrank" />

            <Form.Label>Phí phát hành (VNĐ)</Form.Label>
            <Form.Control disabled value={props.issueFee} placeholder="cardrank" />

            <Form.Label>Phí thường niên (VNĐ)</Form.Label>
            <Form.Control disabled value={props.yearlyFee} placeholder="cardrank" />
        </>
    )
}
export const CompareCreditPanel = (props) => {
    return (
        <div className='mb-5'>
            {CompareGeneralPanel(props)}
            <Form.Label>Điều kiện mở thẻ</Form.Label>
            <Form.Control disabled value={`Lương tháng từ ${props.condition} VNĐ`} placeholder="condition" />

            <Form.Label>Hạng mức tín dụng</Form.Label>
            <Form.Control disabled value={`${props.creditLine} VNĐ`} placeholder="creditLine" />

            <Form.Label>Ngày sao kê thẻ</Form.Label>
            <Form.Control disabled value={`Ngày ${props.statmentDay}`} placeholder="statmentDay" />

            <Form.Label>Ngày đến hạn thanh toán sao kê</Form.Label>
            <Form.Control disabled value={`Sau ngày sao kê ${props.payWithin} ngày`} placeholder="payWithin" />

            <Form.Label>Lãi suất</Form.Label>
            <Form.Control disabled value={`${props.interestRate * 100}% / Tháng`} placeholder="interestRate" />

            <Form.Label>Phí chuyển đổi ngoài tệ</Form.Label>
            <Form.Control disabled value={`${props.exCurrency * 100}% / 1 giao dịch`} placeholder="exCurrency" />


            <Form.Group className="text-center" id="formGridCheckbox">
                <Link to={`/card/intDebits&${props.cardUrl}`}> <Button className='my-3 button-64'
                    style={{ width: '50%' }}>Đăng kí ngay</Button></Link>
            </Form.Group>

        </div>
    )
}

export const CompareDebitPanel = (props) => {
    return (
        <div className='mb-5'>
            {CompareGeneralPanel(props)}
            <Form.Label>Tiền thanh toán tối đa</Form.Label>
            <Form.Control disabled value={`${props.maxPay} VNĐ / 1 ngày`} placeholder="maxpay" />

            <Form.Label>Phí chuyển đổi ngoài tệ</Form.Label>
            <Form.Control disabled value={`${props.exCurrency * 100}% / 1 giao dịch`} placeholder="exCurrency" />

            <Form.Group className="text-center" id="formGridCheckbox">
                <Link to={`/card/intDebits&${props.cardUrl}`}> <Button className='my-3 button-64'
                    style={{ width: '50%' }}>Đăng kí ngay</Button></Link>
            </Form.Group>
        </div>
    )
}

export const CompareDomPanel = (props) => {
    return (
        <div className='mb-5'>
            {CompareGeneralPanel(props)}
            <Form.Label>Tiền thanh toán tối đa</Form.Label>
            <Form.Control disabled value={`${props.maxPay} VNĐ / 1 ngày`} placeholder="maxpay" />

            <Form.Group className="text-center" id="formGridCheckbox">
                <Link to={`/card/domDebits&${props.cardUrl}`}> <Button className='my-3 button-64'
                    style={{ width: '50%' }}>Đăng kí ngay</Button></Link>
            </Form.Group>
        </div>
    )
}

