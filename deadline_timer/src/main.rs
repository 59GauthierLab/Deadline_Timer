use chrono::{DateTime, Local, TimeZone};
use eframe::egui;
use std::time::Duration;

const LABEL_TEXT: &str = "提出まで";

fn main() -> eframe::Result<()> {
    let options = eframe::NativeOptions {
        viewport: egui::ViewportBuilder::default()
            .with_inner_size([600.0, 400.0])
            .with_min_inner_size([600.0, 400.0]),
        centered: true,
        ..Default::default()
    };

    eframe::run_native(
        "締め切りタイマー",
        options,
        Box::new(|_cc| Box::new(DeadlineApp::new())),
    )
}

struct DeadlineApp {
    deadline: DateTime<Local>,
    dark_mode: bool,
}

impl DeadlineApp {
    fn new() -> Self {
        Self {
            deadline: Local
                .with_ymd_and_hms(2026, 1, 27, 15, 59, 59)
                .unwrap(),
            dark_mode: false,
        }
    }
}

impl eframe::App for DeadlineApp {
    fn update(&mut self, ctx: &egui::Context, _frame: &mut eframe::Frame) {
        ctx.request_repaint_after(Duration::from_secs(1));

        let now = Local::now();
        let diff = (self.deadline - now).num_seconds().max(0);

        let days = diff / 86_400;
        let hours = (diff % 86_400) / 3_600;
        let minutes = (diff % 3_600) / 60;
        let seconds = diff % 60;

        let hue = (seconds as f32 / 60.0) * 360.0;
        let color = hsl_color(
            hue,
            if self.dark_mode { 0.7 } else { 0.6 },
            if self.dark_mode { 0.65 } else { 0.4 },
        );

        if self.dark_mode {
            ctx.set_visuals(egui::Visuals::dark());
        } else {
            ctx.set_visuals(egui::Visuals::light());
        }

        egui::CentralPanel::default().show(ctx, |ui| {
            ui.with_layout(
                egui::Layout::top_down(egui::Align::Center),
                |ui| {
                    ui.add_space(10.0);

                    ui.label(
                        egui::RichText::new(LABEL_TEXT)
                            .size(24.0)
                            .weak(),
                    );

                    ui.add_space(12.0);

                    ui.label(
                        egui::RichText::new(format!(
                            "{}d {:02}:{:02}:{:02}",
                            days, hours, minutes, seconds
                        ))
                        .size(56.0)
                        .color(color)
                        .strong(),
                    );
                },
            );
        });

        egui::TopBottomPanel::top("top").show(ctx, |ui| {
            ui.with_layout(egui::Layout::right_to_left(egui::Align::Center), |ui| {
                if ui
                    .add(
                        egui::Button::new(
                            egui::RichText::new("◐").size(28.0),
                        )
                        .frame(false),
                    )
                    .clicked()
                {
                    self.dark_mode = !self.dark_mode;
                }
            });
        });
    }
}

/// HSL → egui::Color32 変換
fn hsl_color(h: f32, s: f32, l: f32) -> egui::Color32 {
    let c = (1.0 - (2.0 * l - 1.0).abs()) * s;
    let x = c * (1.0 - ((h / 60.0) % 2.0 - 1.0).abs());
    let m = l - c / 2.0;

    let (r, g, b) = match h {
        h if h < 60.0 => (c, x, 0.0),
        h if h < 120.0 => (x, c, 0.0),
        h if h < 180.0 => (0.0, c, x),
        h if h < 240.0 => (0.0, x, c),
        h if h < 300.0 => (x, 0.0, c),
        _ => (c, 0.0, x),
    };

    egui::Color32::from_rgb(
        ((r + m) * 255.0) as u8,
        ((g + m) * 255.0) as u8,
        ((b + m) * 255.0) as u8,
    )
}
