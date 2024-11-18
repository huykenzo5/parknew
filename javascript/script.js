$(document).ready(function() {
    $('#searchButton').click(function() {
        performSearch();
    });

    $('#searchInput').keypress(function(e) {
        if (e.which === 13) {
            performSearch();
        }
    });

    $('#feedbackForm').on('submit', function(event) {
        event.preventDefault();
        const name = $(this).find('input[type="text"]').val();
        const email = $(this).find('input[type="email"]').val();
        const message = $(this).find('textarea').val();

        // Lưu phản hồi (có thể thay bằng API thực tế)
        saveFeedback(name, email, message);
        showNotification('Cảm ơn bạn, ' + name + '! Phản hồi của bạn đã được gửi.');
        $(this).trigger('reset'); // Đặt lại form
    });

    // Khởi tạo ngôn ngữ
    initLanguage();
});

function initLanguage() {
    const defaultLanguage = 'vi';
    changeLanguage(defaultLanguage);
}

function changeLanguage(language) {
    const contentMap = {
        vi: {
            welcomeTitle: 'Chào Mừng Đến Với Công Viên Nước',
            footerText: '© 2023 Công Viên Nước. Tất cả quyền được bảo lưu.',
            searchPlaceholder: 'Nhập từ khóa...',
        },
        en: {
            welcomeTitle: 'Welcome to the Water Park',
            footerText: '© 2023 Water Park. All rights reserved.',
            searchPlaceholder: 'Enter keyword...',
        }
    };

    const selectedContent = contentMap[language];
    $('#welcomeTitle').text(selectedContent.welcomeTitle);
    $('#footerText').text(selectedContent.footerText);
    $('#searchInput').attr('placeholder', selectedContent.searchPlaceholder);
}

function performSearch() {
    const searchInput = $('#searchInput').val().toLowerCase();
    const searchableElements = $('.searchable');

    if (searchInput.length < 3) {
        showNotification('Vui lòng nhập ít nhất 3 ký tự để tìm kiếm.');
        return;
    }

    let found = false;
    searchableElements.each(function() {
        const text = $(this).text().toLowerCase();
        if (text.includes(searchInput)) {
            $(this).show();
            found = true;
        } else {
            $(this).hide();
        }
    });

    if (!found) {
        showNotification('Không tìm thấy kết quả phù hợp.');
    }
}

function saveFeedback(name, email, message) {
    // Lưu vào localStorage (có thể thay bằng API thực tế)
    const feedbackHistory = JSON.parse(localStorage.getItem('feedbackHistory')) || [];
    feedbackHistory.push({ name, email, message, date: new Date().toISOString() });
    localStorage.setItem('feedbackHistory', JSON.stringify(feedbackHistory));
}

function showNotification(message) {
    const notification = $('#notification');
    notification.text(message);
    notification.fadeIn().delay(3000).fadeOut(); // Hiện thông báo trong 3 giây
}

function showContent(section) {
    const contentMap = {
        home: {
            vi: `<h2>Chào Mừng Đến Với Công Viên Nước</h2><p class="searchable">Hãy tận hưởng những giây phút thư giãn và vui vẻ tại công viên nước của chúng tôi.</p>`,
            en: `<h2>Welcome to the Water Park</h2><p class="searchable">Enjoy relaxing moments and fun at our water park!</p>`
        },
        // Thêm các nội dung khác...
    };

    const language = $('#languageSelect').val();
    $('#info').html(contentMap[section][language]);
}

// Thay đổi ngôn ngữ khi chọn
$('#languageSelect').change(function() {
    const selectedLanguage = $(this).val();
    changeLanguage(selectedLanguage);
});
$(document).ready(function() {
    // Hiển thị giờ hoạt động khi nhấn nút
    $('#showHoursButton').click(function() {
        alert("Giờ hoạt động:\nThứ 2 - Thứ 7: 9h00 - 18h00\nChủ nhật, Lễ, Tết: 8h30 - 18h00");
    });

    // Tìm kiếm trò chơi
    $('#searchGameButton').click(function() {
        const searchTerm = $('#searchGameInput').val().toLowerCase();
        searchGames(searchTerm);
    });

    // Mua vé online
    $('#buyTicketButton').click(function() {
        window.open('https://booking.damsenwaterpark.com.vn', '_blank');
    });
});

// Hàm tìm kiếm trò chơi
function searchGames(term) {
    const games = [
        "Máng trượt Nhiều Làn",
        "Máng trượt Khổng Lồ",
        "Dòng Sông Lơ Đãng",
        "Siêu tốc",
        "Lốc Xoáy",
        "Dòng Sông Hoang Dã"
    ]; // Danh sách trò chơi

    const results = games.filter(game => game.toLowerCase().includes(term));
    
    if (results.length > 0) {
        alert("Trò chơi tìm thấy: " + results.join(', '));
    } else {
        alert("Không tìm thấy trò chơi nào.");
    }
}