var MdsApp = angular.module("MdsAngularApp", []);

MdsApp.controller("MdsAngularController", function ($scope) {

    $scope.YearsData = [];

    $scope.PrimaryAmount = 1000000; // مبلغ اولیه
    $scope.PaymentInEachMonth = 0; // قسط هر ماه
    $scope.YearlyProfit = 20; // سود سالیانه
    $scope.IncreasePaymentInEachMonthPercent = 0; // درصد افزایش قسط در هر سال
    $scope.MonthNumber = 12; // تعداد ماه
    $scope.YearNumber = 5; // تعداد سال
    $scope.ProfitType = 1; // نوع سود
    $scope.ShowForm = true;
    $scope.CalculateOnClick = function () {
        // محاسبه
        $scope.YearsData = [];
        switch (Number($scope.ProfitType)) {
            case 1: // روز شمار
                calculateRozShomarProfit();
                break;
            case 2: // سالیانه
                calculateYearlyProfit();
                break;
        }
        $scope.ShowForm = false;
    };
    $scope.ReturnButtonOnClick = function () {
        $scope.ShowForm = true;
    }

    function calculateRozShomarProfit() {
        // محاسبه سود روز شمار
        var amount = $scope.PrimaryAmount + ($scope.PrimaryAmount * $scope.YearlyProfit * 31) / 36500.0,
            roundedAmount = Math.ceil(amount),
            paymentInEachMonth = $scope.PaymentInEachMonth, // قسط پرداختی در هر ماه
            paymentAmount = Math.ceil($scope.PrimaryAmount + paymentInEachMonth), // مبلغ پرداختی
            primaryMonthData = {
                Mount: window.AddCommas(roundedAmount), // مبلغ نهایی
                Profit: window.AddCommas(roundedAmount - paymentAmount), // مبلغ سود
                PaymentMount: window.AddCommas($scope.PrimaryAmount) // مبلغ پرداختی
            },
            monthCounter = 1;
        //for (var year = 1; year <= Math.ceil($scope.MonthNumber / 12) ; year++) {
        for (var year = 1; year <= $scope.YearNumber ; year++) {
            if (year > 1) {
                paymentInEachMonth += paymentInEachMonth * $scope.IncreasePaymentInEachMonthPercent / 100;
                paymentInEachMonth = Math.ceil(paymentInEachMonth);
            }
            var data = {
                Year: year,
                PaymentInEachMonth: 'قسط ماهانه در این سال: ' + window.AddCommas(paymentInEachMonth),
                Month: new Array()
            },
                startMonthNumber = year <= 1 ? 2 : 1; // ماه شروع در سال
            if (year <= 1)
                data.Month.push(primaryMonthData);
            // چون مبلغ ماه اول حساب شده پس شروع ماه در سال اول 2 می شود
            for (var month = startMonthNumber; month <= 12; month++) {
                monthCounter++;
                var monthDays = 31; // تعداد روز در ماه
                if (month > 6 && month < 12)
                    monthDays = 30;
                else if (month == 12)
                    monthDays = 29;
                paymentAmount += Math.ceil(paymentInEachMonth);
                amount += paymentInEachMonth + (amount * $scope.YearlyProfit * monthDays) / 36500.0;
                roundedAmount = Math.ceil(amount);
                data.Month.push({
                    Mount: window.AddCommas(roundedAmount),
                    Profit: window.AddCommas(roundedAmount - paymentAmount),
                    PaymentMount: window.AddCommas(paymentAmount)
                });
            }
            $scope.YearsData.push(data);
        }
    }
    function calculateYearlyProfit() {
        // محاسبه سود سالانه
        var paymentInEachMonth = $scope.PaymentInEachMonth,
            paymentAmount = Math.ceil($scope.PrimaryAmount + paymentInEachMonth * 12),
            amount = paymentAmount + ($scope.PrimaryAmount * $scope.YearlyProfit / 100),
            roundedAmount = Math.ceil(amount),
            primaryMonthData = {
                Mount: window.AddCommas(roundedAmount), // مبلغ نهایی
                Profit: window.AddCommas(roundedAmount - paymentAmount), // مبلغ سود
                PaymentMount: window.AddCommas(paymentAmount) // مبلغ پرداختی
            },
            data = {
                Year: 1,
                PaymentInEachMonth: 'قسط ماهانه در این سال: ' + window.AddCommas(Math.ceil(paymentInEachMonth)),
                Month: [primaryMonthData]
            };
        $scope.YearsData.push(data);
        for (var year = 2; year <= $scope.YearNumber ; year++) {
            paymentInEachMonth += paymentInEachMonth * $scope.IncreasePaymentInEachMonthPercent / 100;
            data = {
                Year: year,
                PaymentInEachMonth: 'قسط ماهانه در این سال: ' + window.AddCommas(paymentInEachMonth),
                Month: new Array()
            };
            var payementInCurrentYear = paymentInEachMonth * 12;// مبلغ پرداختی امسال
            paymentAmount += Math.ceil(payementInCurrentYear);
            amount += payementInCurrentYear + (amount * $scope.YearlyProfit / 100);
            roundedAmount = Math.ceil(amount);
            data.Month.push({
                Mount: window.AddCommas(roundedAmount),
                Profit: window.AddCommas(roundedAmount - paymentAmount),
                PaymentMount: window.AddCommas(paymentAmount)
            });
            $scope.YearsData.push(data);
        }
    }
});