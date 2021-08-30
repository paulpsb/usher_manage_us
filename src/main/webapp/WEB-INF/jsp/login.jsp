<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>Usher Institute</title>
		<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />
		<meta content="" name="description" />
		<meta content="" name="author" />
		
		<!-- ================== BEGIN BASE CSS STYLE ================== -->
		<link href="/assets/css/apple/app.min.css" rel="stylesheet" />
		<link href="/assets/plugins/ionicons/css/ionicons.min.css" rel="stylesheet" />
		<!-- ================== END BASE CSS STYLE ================== -->
		
		<script src="/assets/js/jquery.js"></script>
	</head>	
	<body class="pace-top">
		<!-- begin #page-loader -->
		<div id="page-loader" class="fade show">
			<span class="spinner"></span>
		</div>
		<div id="page-container" class="fade">
			<!-- begin login -->
			<div class="login login-v1">
				<!-- begin login-container -->
				<div class="login-container">
					<!-- begin login-header -->
					<div class="login-header">
						<div class="brand">
							<span class="logo"><i class="ion-ios-cloud"></i></span> <b>Usher</b> Institute
							<small>Usher Institute Management</small>
						</div>
						<div class="icon">
							<i class="fa fa-lock"></i>
						</div>
					</div>
					<!-- end login-header -->
					<!-- begin login-body -->
					<div class="login-body">
						<!-- begin login-content -->
						<div class="login-content">
							<form action="/main/dashboard.do" onsubmit="return flogin_submit(this);" method="GET" class="margin-bottom-0">
								<div class="form-group m-b-20">
									<input type="text" class="form-control form-control-lg inverse-mode" id="username" placeholder="Username" required />
								</div>
								<div class="form-group m-b-20">
									<input type="password" class="form-control form-control-lg inverse-mode" id="userpassword" placeholder="Password" required />
								</div>
								<div class="checkbox checkbox-css m-b-20">
									<input type="checkbox" id="save_username" name="save_username"  /> 
									<label for="save_username">
									Remember Username
									</label>
								</div>
								<div class="login-buttons">
									<button type="submit" class="btn btn-success btn-block btn-lg">Login</button>
								</div>
							</form>
						</div>
						<!-- end login-content -->
					</div>
					<!-- end login-body -->
				</div>
				<!-- end login-container -->
			</div>
			<!-- end login -->
		</div>
		<script type="text/javascript" src="/ui/login.js"></script>
		<script src="/assets/js/common.js"></script>
		<!-- ================== BEGIN BASE JS ================== -->
		<script src="/assets/js/app.min.js"></script>
		<script src="/assets/js/theme/apple.min.js"></script>
		<!-- ================== END BASE JS ================== -->		
	</body>
</html>